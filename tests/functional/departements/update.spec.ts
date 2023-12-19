import { test } from '@japa/runner'
import Dept from 'App/Models/Dept'
import User from 'App/Models/User'

test.group('Departements module', () => {
    test('data update test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Dept.findByOrFail('company', 'Test Dummy')
        const res = await client
            .patch(`/api/dept/${q.id}`)
            .form({
                company: q.company,
                code: q.code,
                deptname: q.deptname,
            })
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
            msg: 'update success'
        })
    })

    test('data update validation test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Dept.findByOrFail('company', 'Test Dummy')
        const res = await client
            .patch(`/api/dept/${q.id}`)
            .form({
                company: '',
                code: '',
                deptname: '',
            })
            .loginAs(user!)
        var errors: any[] = []
        res.body().data.errors.forEach((e) => {
            errors.push({
                rule: e.rule,
                field: e.field,
                message: e.message,
            })
        });
        res.assertStatus(400)
        res.assertBodyContains({ status: false, data: { errors }, msg: 'update error' })
    })
})