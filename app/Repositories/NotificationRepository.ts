import Notification from "App/Models/Notification";
import BaseRepository from "./BaseRepository";
import { response, responseErrors } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";

export default class NotificationRepository extends BaseRepository {
    constructor() {
        super(Notification);
    }
    async notifPaginate(req: { sortDesc: string; page: number; limit: number; }, user: number) {
        try {
            const { sortDesc, page, limit } = req
            const q = await Notification.query()
                .where((query) => {
                    query
                        .where('view', 'n')
                        .andWhere('user_notif_target', user)
                })
                .orWhere((query) => {
                    query
                        .where('view', 'n')
                        .andWhereNull('user_notif_target')
                })
                .orderBy([
                    {
                        column: 'created_at',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ]).paginate(page, limit)
            const c = await Database
                .from('notifications')
                .where((query) => {
                    query
                        .where('view', 'n')
                        .andWhere('user_notif_target', user)
                })
                .orWhere((query) => {
                    query
                        .where('view', 'n')
                        .andWhereNull('user_notif_target')
                })
                .count('* as total')
            return response(200, { pagination: q, count: c[0].total })
        } catch (error) {
            return responseErrors(error)
        }
    }

    async notifSetView(id: number) {
        const data: any[] = []
        try {
            const q = await Notification.findOrFail(id)
            q.view = 'y'
            await q?.save()
            data.push(q)
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, data)
        }
    }
}
