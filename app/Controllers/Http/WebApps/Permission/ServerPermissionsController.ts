import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServerPermissionRepository from 'App/Repositories/Permission/ServerPermissionRepository';
import { ServerPermissionValidator } from 'App/Validators/DeptValidator';

export default class ServerPermissionsController {
    private repository: any;
    constructor() {
        this.repository = new ServerPermissionRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-server")
        if (await bouncer.allows('read-server')) {
            const q = await this.repository.paginateServer(request.all())
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-server")
        if (await bouncer.allows('create-server')) {
            const payload = await request.validate(ServerPermissionValidator)
            const q = await this.repository.store(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("read-server")
        if (await bouncer.allows('read-server')) {
            const q = await this.repository.findServer(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("update-server")
        if (await bouncer.allows('update-server')) {
            const payload = await request.validate(ServerPermissionValidator)
            const q = await this.repository.update(request.param('id'), payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("delete-server")
        if (await bouncer.allows('delete-server')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
