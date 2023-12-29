import Role from "App/Models/Master-data/Role";
import BaseRepository from "../BaseRepository";
import { response, responseErrors } from "App/helper";
import RoleHasPermission from "App/Models/Master-data/RoleHasPermission";
import GroupPermission from "App/Models/Master-data/GroupPermission";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RoleRepository extends BaseRepository {
    constructor() {
        super(Role);
    }
    async paginateRole(req) {
        try {
            const { sortBy, search, sortDesc, page, limit } = req
            const count = await Database
                .from('roles')
                .count('* as total')
            const q = await Role.query()
                .where((query)=>{
                    query
                    .where(sortBy !== '' ? sortBy : 'company', 'LIKE', '%' + search + '%')
                    .orWhere(sortBy !== '' ? sortBy : 'code', 'LIKE', '%' + search + '%')
                    .orWhere(sortBy !== '' ? sortBy : 'rolename', 'LIKE', '%' + search + '%')
                    .orWhere(sortBy !== '' ? sortBy : 'coderole', 'LIKE', '%' + search + '%')
                })
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : 'nik',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ])
                .preload('permission')
                .preload('users')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
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
