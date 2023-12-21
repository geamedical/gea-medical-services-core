import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionRepository from 'App/Repositories/Master-data/PermissionRepository';
import PermissionValidator from "App/Validators/PermissionValidator"

export default class PermissionsController {
    private repository: any;
    constructor() {
        this.repository = new PermissionRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-permission")
        if (await bouncer.allows('read-permission')) {
            const q = await this.repository.paginateAccess(request.all())
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-permission")
        if (await bouncer.allows('create-permission')) {
            const payload = await request.validate(PermissionValidator)
            const q = await this.repository.storePermission(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-permission")
        if (await bouncer.allows('read-permission')) {
            const q = await this.repository.find('id',request.param('id'))
            if (q.res.data === null) {
                const f = await this.repository.find('name',request.param('id'))
                return response.status(f.statCode).send(f.res)
            }
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("update-permission")
        if (await bouncer.allows('update-permission')) {
            const payload = await request.validate(PermissionValidator)
            const q = await this.repository.updatePermission(request.param('id'), payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        if (await bouncer.allows('delete-permission')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
