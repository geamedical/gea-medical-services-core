import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Event from '@ioc:Adonis/Core/Event'
import AuthRepository from 'App/Controllers/Repositories/AuthRepository';
import { LoginValidator } from 'App/Validators/AuthValidator';
import { AuthValidatorUpdate, PasswordValidator } from 'App/Validators/UserValidator'
import { DateTime } from 'luxon';

export default class AuthController {
    private repository: any;
    constructor() {
        this.repository = new AuthRepository();
    }
    /*
    |--------------------------------------------------------------------------
    | LOGIN::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const payload = await request.validate(LoginValidator)
            const q = await this.repository.validateLoginSync(payload)
            let credential = q.res.data
            if (credential.username !== '' && credential.password !== '') {
                const token = await auth.use("api").attempt(credential.username, credential.password, {
                    expiresIn: "1 days",
                });
                return response.status(200).send({ status: true, data: token, msg: 'login success' })
            }
            return response.status(401).send({ status: false, data: null, msg: 'login error, user not found on local db or erp system!' })
        } catch (error) {
            console.log(error);
            return response.abort({ status: false, data: error.code, msg: 'login error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profile({ auth, response }: HttpContextContract) {
        const q = await this.repository.profile(auth.user!.id)
        return response.status(q.statCode).send(q.res)
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE UPDATE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profileUpdate({ response, request, auth }: HttpContextContract) {
        const payload = await request.validate(AuthValidatorUpdate)
        if (request.input('password')) {
            const paypass = await request.validate(PasswordValidator)
            payload['password'] = paypass.password
        }
        const q = await this.repository.updateProfile(auth.user!.id, payload)
        return response.status(q.statCode).send(q.res)
    }
    /*
    |--------------------------------------------------------------------------
    | LOGOUT::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async logout({ auth, response }: HttpContextContract) {
        try {
            if (await auth.check()) {
                const updateUser = await User.findOrFail(auth.user?.id)
                updateUser.islogin = 'n'
                updateUser.last_login = DateTime.local()
                if (await updateUser.save()) {
                    auth.use("api").logout()
                }
            }
            const msg = (await auth.check()) ? 'Success logout' : 'Invalid Credential'
            Event.emit('auth-logout:user', auth.user!)
            return response.send({ status: true, data: msg, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
}
