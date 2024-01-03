import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NasDirPermissionRepository from 'App/Repositories/Permission/NasDirPermissionRepository';
import { NasDirValidator } from 'App/Validators/DeptValidator';

export default class NasDirPermissionsController {
    private repository: any;
    constructor() {
        this.repository = new NasDirPermissionRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-nasserver")
        if (await bouncer.allows('read-nasserver')) {
            const q = await this.repository.paginateNas(request.all())
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-nasserver")
        if (await bouncer.allows('create-nasserver')) {
            const payload = await request.validate(NasDirValidator)
            const q = await this.repository.store(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("read-nasserver")
        if (await bouncer.allows('read-nasserver')) {
            const q = await this.repository.findNas(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("update-nasserver")
        if (await bouncer.allows('update-nasserver')) {
            const payload = await request.validate(NasDirValidator)
            const q = await this.repository.update(request.param('id'), payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("delete-nasserver")
        if (await bouncer.allows('delete-nasserver')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
