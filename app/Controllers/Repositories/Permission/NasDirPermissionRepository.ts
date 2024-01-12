import NasDirPermission from "App/Models/Permissiion/NasDirPermission";
import BaseRepository from "../BaseRepository";
import Database from "@ioc:Adonis/Lucid/Database";
import { response, responseErrors } from "App/helper";

export default class NasDirPermissionRepository extends BaseRepository {
    constructor() {
        super(NasDirPermission);
    }
    async paginateNas(req: { search: string; page: number; limit: number; }) {
        try {
            
            const { search, page, limit } = req
            const count = await Database
                .from('nas_dir_permissions')
                .count('* as total')
            const q = await NasDirPermission.query()
                .where('dirname', 'LIKE', '%' + search + '%')
                .preload('user_primary')
                .preload('user_secondary')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async findNas(id: number) {
        try {
            const q = await NasDirPermission.query()
                .where('id', id)
                .preload('user_primary')
                .preload('user_secondary')
                .first()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
