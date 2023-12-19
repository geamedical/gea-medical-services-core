import { response, responseErrors } from "App/helper";
import BaseRepository from "./BaseRepository";
import Permission from "App/Models/Permission";
import GroupPermission from "App/Models/GroupPermission";
import Database from "@ioc:Adonis/Lucid/Database";

export default class PermissionRepository extends BaseRepository {
    constructor() {
        super(Permission);
    }
    async paginateAccess(data: any) {
        try {
            const { sortBy, search, sortDesc, page, limit } = data
            const count = await Database
                .from('permissions')
                .count('* as total')
            const q = await Permission.query().where((query) => {
                query
                    .where('name', 'LIKE', '%' + search + '%')
            })
                .orderBy([{ column: sortBy !== '' ? sortBy : 'created_at', order: sortDesc ? 'desc' : 'asc' }])
                .preload('parent')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async storePermission(data: any) {
        try {
            const p1 = new GroupPermission()
            p1.name = data.name.toLowerCase()
            await p1.save()
            const datacreate: any[] = []
            for (let i = 0; i < data.permission.length; i++) {
                const txt = data.permission[i] + '-' + data.name
                datacreate.push({ name: txt.toLowerCase() })
            }
            await p1.related('child').createMany(datacreate)
            return response(200, data)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async updatePermission(id: number, data: any) {
        try {
            const q = await Permission.findOrFail(id)
            if (q) {
                const del = await Permission.query().where('group_permission_id', q.group_permission_id).delete()
                if (del) {
                    const p1 = new GroupPermission()
                    p1.name = data.name.toLowerCase()
                    await p1.save()
                    const datacreate: any[] = []
                    for (let i = 0; i < data.permission.length; i++) {
                        const txt = data.permission[i] + '-' + data.name
                        datacreate.push({ name: txt.toLowerCase() })
                    }
                    await p1.related('child').createMany(datacreate)
                }
            }
            return response(200, data)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
