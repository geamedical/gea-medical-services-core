import FormReqGa from "App/Models/FormReqGa";
import BaseRepository from "./BaseRepository";
import { response, responseErrors } from "App/helper";
import Event from '@ioc:Adonis/Core/Event'
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FormPermintaanRepository extends BaseRepository {
    constructor() {
        super(FormReqGa);
    }
    async paginateData(req: { sortBy: string; search: string; sortDesc: string; page: number; limit: number; }) {
        try {
            const { sortBy, search, sortDesc, page, limit } = req
            const count = await Database
                .from('form_req_gas')
                .count('* as total')
            const q = await FormReqGa.query().where(async (query) => {
                query
                    .where('type', 'LIKE', '%' + search + '%')
                    .orWhere('detail', 'LIKE', '%' + search + '%')
                    .orWhere('notes', 'LIKE', '%' + search + '%')
            })
                .orderBy([{ column: sortBy !== '' ? sortBy : 'created_at', order: sortDesc ? 'desc' : 'asc' }])
                .preload('user')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async storeForm(req: any) {
        try {
            const u_data = {
                name: req.user.name,
                password: 'Gea-emp123!!',
                role_id: req.user.role_id,
                dept_id: req.user.dept_id,
                telp: req.user.telp,
            }
            const u = await User.updateOrCreate(req.user, u_data)
            if (u) {
                await u.related('formPermintaan').createMany(req.request)
            }
            Event.emit('form:permintaan', req)
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, req)
        }
    }
    async setStatus(status: string, id: number) {
        try {
            const q = await FormReqGa.findOrFail(id)
            q.status = status
            await q.save()
            Event.emit('form:permintaan:setstatus', { user_id: q.user_id, status: status, data_id: id })
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, status)
        }
    }
    async findForm(id: number) {
        const data = {}
        try {
            const u = await User.query().where('id', id).preload('dept').preload('roles').first()
            const f = await FormReqGa.query().where('user_id', u!.id)
            data['user'] = u
            const dataReq: any[] = []
            f.forEach(e => {
                dataReq.push({
                    type: e.type,
                    detail: e.detail,
                    notes: e.notes,
                    status: e.status,
                    created_at: e.createdAt,
                    updated_at: e.updatedAt,
                },)
            });
            data['request'] = dataReq
        } catch (error) {
            return responseErrors(error)
        }
        finally {
            return response(200, data)
        }
    }

    async updateForm(id: number, request) {
        const data = {}
        try {
            request.request.forEach(async (e: { created_at: string; updated_at: string; }) => {
                await FormReqGa.query().where('user_id', id)
                    .andWhere('created_at', e.created_at)
                    .andWhere('updated_at', e.updated_at)
                    .delete()
            });
            const f = await User.findOrFail(id)
            if (f) {
                await f.related('formPermintaan').createMany(request.request)
            }
            data['user'] = request.user
            data['request'] = request.request
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, data)
        }
    }

    async validatePin(request) {
        const data = {}
        try {
            const input = request.pin
            const u = await Database
                .from('users')
                .where('username', '!=', input['username'])
                .andWhere('pin', input['pin'])
                .andWhere('activation', 'valid')
                .count('* as total')
            data['total'] = u[0].total
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, data)
        }
    }
}
