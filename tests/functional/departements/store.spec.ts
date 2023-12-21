import { test } from '@japa/runner'
import User from 'App/Models/User'

export function store() {
    test('data store test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/dept')
            .form({
                company: 'Test Dummy',
                code: 'Test Dummy',
                deptname: 'Test Dummy',
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
            msg: 'success'
        })
    })
}
export function store_validation() {
    test('data store validation test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/dept')
            .form({
                company: '',
                code: '',
                deptname: '',
            })
            .loginAs(user!)
        var errors: any[] = []
        res.body().errors.forEach((e: { rule: string; field: string; message: string }) => {
            errors.push({
                rule: e.rule,
                field: e.field,
                message: e.message,
            })
        });
        res.assertStatus(422)
        res.assertBodyContains({ errors })
    })
}
