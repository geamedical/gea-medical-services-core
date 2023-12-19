import { test } from '@japa/runner'
import Dept from 'App/Models/Dept'
import User from 'App/Models/User'

test.group('Departements module', () => {
    test('data show test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .get(`/api/dept/${id}`)
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                id: res.body().data.id,
                company: res.body().data.company,
                code: res.body().data.code,
                deptname: res.body().data.deptname,
                created_at: res.body().data.created_at,
                updated_at: res.body().data.updated_at,
            },
            msg: 'show success'
        })
    })
})
