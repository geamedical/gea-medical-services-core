import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleRepository from 'App/Repositories/Master-data/RoleRepository';
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {
    private repository: any;
    constructor() {
        this.repository = new RoleRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-role")
        if (await bouncer.allows('read-role')) {
            const q = await this.repository.paginate('rolename', 'created_at', request.all())
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-role")
        if (await bouncer.allows('create-role')) {
            const payload = await request.validate(RoleValidator)
            const q = await this.repository.store(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("read-role")
        if (await bouncer.allows('read-role')) {
            const q = await this.repository.find('id', request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("update-role")
        if (await bouncer.allows('update-role')) {
            const payload = await request.validate(RoleValidator)
            const q = await this.repository.update(request.param('id'), payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("delete-role")
        if (await bouncer.allows('delete-role')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
