import { test } from '@japa/runner'
import User from 'App/Models/User'
import moment from 'moment'

test.group('Authentication module', () => {
    test('profile update not password test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client.post('/api/profile-update')
            .loginAs(user!)
            .form({
                activation: user!.activation === 'active' ? true : false,
                address: user!.address,
                birthdate: moment(user!.birthdate).format("YYYY-MM-DD"),
                dept_id: user!.dept_id,
                email: user!.email,
                gender: user!.gender,
                marital: user!.marital,
                name: user!.name,
                nik: user!.nik,
                noktp: user!.noktp,
                npwp: user!.npwp,
                role_id: user!.role_id,
                telp: user!.telp,
                username: user!.username,
            })
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                id: res.body().data.id,
                role_id: res.body().data.role_id,
                dept_id: res.body().data.dept_id,
                name: res.body().data.name,
                nik: res.body().data.nik,
                email: res.body().data.email,
                pin: res.body().data.pin,
                username: res.body().data.username,
                birthdate: res.body().data.birthdate,
                gender: res.body().data.gender,
                marital: res.body().data.marital,
                npwp: res.body().data.npwp,
                noktp: res.body().data.noktp,
                address: res.body().data.address,
                telp: res.body().data.telp,
                activation: res.body().data.activation,
                islogin: res.body().data.islogin,
                last_login: res.body().data.last_login,
                created_at: res.body().data.created_at,
                updated_at: res.body().data.updated_at,
            },
            msg: 'success',
        })
    })
})
