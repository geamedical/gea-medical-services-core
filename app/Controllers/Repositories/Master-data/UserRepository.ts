import User from "App/Models/User";
import BaseRepository from "../BaseRepository";
import { DateTimeFormated, response, responseErrors } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async getUsersLogin(req) {
        try {
            const q = await User.query().where('islogin', 'y').paginate(req.page, req.limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async getUsersPaginate(req) {
        try {
            const { sortBy, search, sortDesc, page, limit, start, finish } = req
            const count = await Database
                .from('users')
                .count('* as total')
            const qstart = await Database.rawQuery('select MIN(created_at) as created_at from users limit 1')
            const qfinish = await Database.rawQuery('select MAX(created_at) as created_at from users limit 1')
            const q = await User.query()
                .where(sortBy !== '' ? sortBy : 'name', 'LIKE', '%' + search + '%')
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : 'nik',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ])
                .whereBetween('created_at', [
                    start === undefined || start === '' ? DateTimeFormated('YYYY-MM-DD HH:mm:ss', qstart[0][0].created_at) : start,
                    finish === undefined || finish === '' ? DateTimeFormated('YYYY-MM-DD HH:mm:ss', qfinish[0][0].created_at) : finish,
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
