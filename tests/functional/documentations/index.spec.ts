import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function list() {
    test('data list test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const sortBy = 'id'
        const search = ''
        const sortDesc = true
        const page = 1
        const limit = 10
        const res = await client.get(`/api/documentation?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
            .loginAs(user!)
        res.assertStatus(200)
        var datafetch: any[] = []
        res.body().data.data.forEach((e) => {
            datafetch.push({
                id: e.id,
                title: e.title,
                desc: e.desc,
                created_at: e.created_at,
                updated_at: e.updated_at,
                listep: e.listep,
                map: e.map,
                chart: e.chart,
                flow: e.flow,
            })
        });
        res.assertBodyContains({
            status: true,
            data: {
                meta: {
                    total: res.body().data.meta.total,
                    per_page: res.body().data.meta.per_page,
                    current_page: res.body().data.meta.current_page,
                    last_page: res.body().data.meta.last_page,
                    first_page: res.body().data.meta.first_page,
                    first_page_url: res.body().data.meta.first_page_url,
                    last_page_url: res.body().data.meta.last_page_url,
                    next_page_url: res.body().data.meta.next_page_url,
                    previous_page_url: res.body().data.meta.previous_page_url
                },
                data: datafetch
            },
            msg: 'success',
        })
    })
}