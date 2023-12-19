import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Authentication module', () => {
    test('get profile test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client.get('/api/profile').loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                user: {
                    id: res.body().data.user.id,
                    role_name: res.body().data.user.role_name,
                    dept_name: res.body().data.user.dept_name,
                    role_id: res.body().data.user.role_id,
                    dept_id: res.body().data.user.dept_id,
                    name: res.body().data.user.name,
                    pin: res.body().data.user.pin,
                    nik: res.body().data.user.nik,
                    email: res.body().data.user.email,
                    username: res.body().data.user.username,
                    birthdate: res.body().data.user.birthdate,
                    gender: res.body().data.user.gender,
                    marital: res.body().data.user.marital,
                    npwp: res.body().data.user.npwp,
                    noktp: res.body().data.user.noktp,
                    address: res.body().data.user.address,
                    telp: res.body().data.user.telp,
                    activation: res.body().data.user.activation,
                },
                permission: res.body().data.permission
            },
            msg: 'success',
        })
    })
})
