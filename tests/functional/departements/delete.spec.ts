import { test } from '@japa/runner'
import Dept from 'App/Models/Dept'
import User from 'App/Models/User'

test.group('Departements module', () => {
    test('data delete test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Dept.query().orderBy('id', 'asc').limit(1).first()
        const res = await client
            .delete(`/api/dept/${q!.id}`)
            .loginAs(user!)    
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                company: res.body().data.company,
                code: res.body().data.code,
                deptname: res.body().data.deptname,
                created_at: res.body().data.created_at,
                updated_at: res.body().data.updated_at,
                id: res.body().data.id,
            },
            msg: 'destroy success'
        })
    })
})