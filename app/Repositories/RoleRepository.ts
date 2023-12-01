import Role from "App/Models/Role";
import BaseRepository from "./BaseRepository";
import { response, responseErrors } from "App/helper";
import RoleHasPermission from "App/Models/RoleHasPermission";
import GroupPermission from "App/Models/GroupPermission";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RoleRepository extends BaseRepository {
    constructor() {
        super(Role);
    }
    async getRolePermissionPaginate(req: { sortDesc: string; page: number; limit: number; }) {
        try {
            const { page, limit } = req
            const count = await Database
                .from('group_permissions')
                .count('* as total')
            const q = await GroupPermission
                .query()
                .preload('child')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async getRolePermissionStore(data: any) {
        try {
            const arrname = [] as any;
            const fetch = data.permission_id
            for (let i = 0; i < fetch.length; i++) {
                arrname.push({
                    role_id: data.role_id,
                    permission_id: fetch[i]
                })
            }
            await RoleHasPermission.updateOrCreateMany(['role_id', 'permission_id'], arrname)
            return response(200, arrname)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async getRolePermissionShow(id: number) {
        try {
            const q = await RoleHasPermission.query()
                .where('role_id', id)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async getRolePermissionUpdate(data: any) {
        try {
            const arrname = [] as any;
            const fetch = data.permission_id
            for (let i = 0; i < fetch.length; i++) {
                arrname.push(fetch[i])
            }
            await (await Role.findOrFail(data.role_id)).related('permission').sync(arrname)
            return response(200, data)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async deleteRolePermission(id: number) {
        try {
            const q = await RoleHasPermission.findOrFail(id)
            await q.delete()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
