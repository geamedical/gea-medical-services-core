import { test } from '@japa/runner'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'

test.group('Permissions module', () => {
    test('data update test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .patch(`/api/permission/${id}`)
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

    test('data update validation test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .patch(`/api/permission/${id}`)
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
})