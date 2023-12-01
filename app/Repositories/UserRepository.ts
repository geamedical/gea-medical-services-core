import User from "App/Models/User";
import BaseRepository from "./BaseRepository";
import { response, responseErrors } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async getUsersPaginate(req: { sortBy: string; search: string; sortDesc: string; page: number; limit: number; }) {
        try {
            const { sortBy, search, sortDesc, page, limit } = req
            const count = await Database
                .from('users')
                .count('* as total')
            const q = await User.query()
                .where(sortBy !== '' ? sortBy : 'name', 'LIKE', '%' + search + '%')
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : 'nik',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ])
                .preload('roles').preload('dept').paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async userShow(id: number) {
        try {
            const q = await User
                .query()
                .where('id', id)
                .preload('roles')
                .preload('dept')
                .first()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
