import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Permission from 'App/Models/Master-data/Permission'
import Role from 'App/Models/Master-data/Role'
import RoleRepository from 'App/Repositories/Master-data/RoleRepository'

export default class SetRolePermissionsController {
    private roleRepository: any;
    constructor() {
        this.roleRepository = new RoleRepository();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const q = await this.roleRepository.getRolePermissionPaginate(request.all())
                return response.status(q.statCode).send(q.res)
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("create-permission")
            if (await bouncer.allows('create-permission')) {
                const newPostSchema = schema.create({
                    role_id: schema.number(),
                    permission_id: schema.array().members(schema.number()),
                })
                const payload = await request.validate({ schema: newPostSchema })
                const q = await this.roleRepository.getRolePermissionStore(payload)
                return response.status(q.statCode).send(q.res)
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async attr_form({ bouncer, response }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const jabatan = await Role.all()
                const akses = await Permission.all()
                return response.ok({ status: true, data: { "role": jabatan, "akses": akses }, msg: 'attr success' })
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
        } catch (error) {
            return response.abort({ status: false, data: error.messages, msg: 'attr error' })
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const id = request.param('id')
                const q = await this.roleRepository.getRolePermissionShow(id)
                return response.status(q.statCode).send(q.res)
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("update-permission")
           if (await bouncer.allows('update-permission')) {
                const newPostSchema = schema.create({
                    role_id: schema.number(),
                    permission_id: schema
                        .array([
                            rules.minLength(1)
                        ])
                        .members(schema.number()),
                })
                const payload = await request.validate({ schema: newPostSchema })
                const q = await this.roleRepository.getRolePermissionUpdate(payload)
                return response.status(q.statCode).send(q.res)
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        await bouncer.authorize("delete-permission")
            if (await bouncer.allows('delete-permission')) {
                const q = await this.roleRepository.deleteRolePermission(request.param('id'))
        return response.status(q.statCode).send(q.res)
            }
            return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
    }
}
