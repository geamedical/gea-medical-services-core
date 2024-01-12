import BaseRepository from "../BaseRepository";
import Database from "@ioc:Adonis/Lucid/Database";
import { response, responseErrors } from "App/helper";
import ServerPermission from "App/Models/Permissiion/ServerPermission";

export default class ServerPermissionRepository extends BaseRepository {
    constructor() {
        super(ServerPermission);
    }
    async paginateServer(req: { search: string; page: number; limit: number; }) {
        try {

            const { search, page, limit } = req
            const count = await Database
                .from('server_permissions')
                .count('* as total')
            const q = await ServerPermission.query()
                .where('server', 'LIKE', '%' + search + '%')
                .preload('user').paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async findServer(id: number) {
        try {
            const q = await ServerPermission.query()
                .where('id', id)
                .preload('user')
                .first()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
