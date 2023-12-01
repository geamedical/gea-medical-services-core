import { response, responseErrors } from 'App/helper';
export default class BaseRepository {
    private model: any;
    constructor(model: any) {
        this.model = model;
    }

    async paginate(colsearch: string, colsort: string, req: { sortBy: string; search: string; sortDesc: string; page: number; limit: number; }) {
        try {
            const { sortBy, search, sortDesc, page, limit } = req
            const count = await this.model.query().count('* as total').first()

            const q = await this.model.query()
                .where(sortBy !== '' ? sortBy : colsearch, 'LIKE', '%' + search + '%')
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : colsort,
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ]).paginate(page, limit < 5 ? count.$extras.total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async all() {
        try {
            const q = this.model.all()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async find(column: string, id: number) {
        try {
            const q = await this.model.query().where(column, id).first()
            return response(200, q)
        } catch (error) {
            console.log(error);
            
            return responseErrors(error)
        }
    }

    async store(data: any) {
        try {
            const q = new this.model
            q.merge(data)
            await q.save()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async update(id: number, data: any) {
        try {
            const q = await this.model.find(id)
            if (!q) {
                return { status: false, data: 'undefined data!', msg: 'update error' }
            }
            q.merge(data)
            await q.save()
            return response(200, data)
        } catch (error) {
            return responseErrors(error)
        }
    }

    async delete(id: number) {
        try {
            const q = await this.model.find(id);
            if (!q) {
                return { status: false, data: 'undefined data!', msg: 'destroy error' }
            }
            await q.delete();
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
