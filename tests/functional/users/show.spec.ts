import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function show() {
    test('data show test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await User.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .get(`/api/users/${id}`)
            .loginAs(user!)
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
                roles: res.body().data.roles,
                dept: res.body().data.dept
            },
            msg: 'success'
        })
    })
}