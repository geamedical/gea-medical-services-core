import { test } from '@japa/runner'
import Documentation from 'App/Models/Master-data/Documentation'
import User from 'App/Models/User'

export default function show() {
    test('data show test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Documentation.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            let id = q.id
            const res = await client
                .get(`/api/documentation/${id}`)
                .loginAs(user!)
            res.assertStatus(200)
            res.assertBodyContains({
                status: true,
                data: {
                    id: res.body().data.id,
                    title: res.body().data.title,
                    desc: res.body().data.desc,
                    created_at: res.body().data.created_at,
                    updated_at: res.body().data.updated_at,
                    listep: res.body().data.listep,
                    map: res.body().data.map,
                    flow: res.body().data.flow,
                    chart: res.body().data.chart,
                },
                msg: 'success'
            })
        }
    })
}
