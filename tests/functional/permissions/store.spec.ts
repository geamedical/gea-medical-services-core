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
            .post('/api/permission')
            .form({
                name: 'Test',
                permission: ['create', 'read', 'update', 'delete', 'export', 'import']
            })
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                name: res.body().data.name,
                permission: res.body().data.permission
            },
            msg: 'success'
        })
    })
}

export function store_validation() {
    test('data store validations test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/permission')
            .form({
                name: '',
                permission: []
            })
            .loginAs(user!)
        res.assertStatus(422)
        res.assertBodyContains({
            errors: res.body().errors
        })
    })
}
