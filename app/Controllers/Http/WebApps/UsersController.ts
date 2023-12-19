import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dept from 'App/Models/Dept'
import Role from 'App/Models/Role'
import UserRepository from 'App/Repositories/UserRepository'
import { UserValidatorStore, UserValidatorUpdate } from 'App/Validators/UserValidator'
export default class UsersController {
    private repository: any;
    constructor() {
        this.repository = new UserRepository();
    }

    public async index({ bouncer, response, request }: HttpContextContract) {
        // await bouncer.authorize("read-user")
        if (await bouncer.allows('read-user')) {
            const q = await this.repository.getUsersPaginate(request.all())
            return response.status(q.statCode).send(q.res)
        }
        const q = await this.repository.getUsersPaginate(request.all())
        return response.status(q.statCode).send(q.res)
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-user")
        if (await bouncer.allows('create-user')) {
            const payload = await request.validate(UserValidatorStore)
            const q = await this.repository.store(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("read-user")
        if (await bouncer.allows('read-user')) {
            const q = await this.repository.userShow(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        if (await bouncer.allows('update-user')) {
            const payload = await request.validate(UserValidatorUpdate)
            const q = await this.repository.update(request.param('id'), payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("delete-user")
        if (await bouncer.allows('delete-user')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
    public async attr_form({ response }: HttpContextContract) {
        try {
            const roles = await Role.all()
            const depts = await Dept.all()
            return response.send({
                status: true, data: { roles, depts }, msg: 'attr success'
            })
        } catch (error) {
            return response.abort({ status: false, data: error.messages, msg: 'attr error' })
        }
    }
}
