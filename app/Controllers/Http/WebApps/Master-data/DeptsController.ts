import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dept from 'App/Models/Master-data/Dept'
import DeptRepository from 'App/Controllers/Repositories/Master-data/DeptRepository';
import { DeptValidator } from 'App/Validators/DeptValidator';

export default class DeptsController {
    private repository: any;
    constructor() {
        this.repository = new DeptRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-departement")
        if (await bouncer.allows('read-departement')) {
            const q = await this.repository.paginate('deptname', 'created_at', request.all())
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        if (await bouncer.allows('create-departement')) {
            const payload = await request.validate(DeptValidator)
            const q = await this.repository.store(payload)
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("read-departement")
            if (await bouncer.allows('read-departement')) {
                const q = await Dept.find(request.param('id'));
                return response.send({ status: true, data: q, msg: 'show success' })
            }
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'show error' })
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("update-departement")
            if (await bouncer.allows('update-departement')) {
                const payload = await request.validate(DeptValidator)
                const q = await Dept.findOrFail(request.param('id'))
                q.deptname = payload.deptname
                await q.save()
                return response.send({ status: true, data: payload, msg: 'update success' })
            }
        } catch (error) {
            return response.abort({ status: false, data: error.messages, msg: 'update error' })
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        if (await bouncer.allows('delete-departement')) {
            const q = await this.repository.delete(request.param('id'))
            return response.status(q.statCode).send(q.res)
        }
        return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
