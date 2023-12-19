import AccessServerRequest from "App/Models/Permintaan/AccessServerRequest";
import BaseRepository from "../BaseRepository";
import Database from "@ioc:Adonis/Lucid/Database";
import { response, responseErrors } from "App/helper";

export default class AksesServerRepository extends BaseRepository {
    constructor() {
        super(AccessServerRequest);
    }

    async paginateRelation(req) {
        try {
            const { sortBy, sortDesc, page, limit } = req
            const count = await Database
                .from('access_server_requests')
                .count('* as total')
            const q = await AccessServerRequest.query()
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : 'created_at',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ])
                .preload('server_detail')
                .preload('yang_mengajukan')
                .preload('yang_mengizinkan')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
