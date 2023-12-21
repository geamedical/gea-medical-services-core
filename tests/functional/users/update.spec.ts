import { test } from '@japa/runner'
import User from 'App/Models/User'
import moment from 'moment'


export function update() {
    test('users update test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await User.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .patch(`/api/users/${id}`)
            .form({
                activation: q!.activation,
                address: q!.address,
                birthdate: moment(q!.birthdate).format('YYYY-MM-DD'),
                dept_id: q!.dept_id,
                email: q!.email,
                gender: q!.gender,
                marital: q!.marital,
                name: q!.name,
                pin: q!.pin,
                nik: q!.nik,
                noktp: q!.noktp,
                npwp: q!.npwp,
                role_id: q!.role_id,
                telp: q!.telp,
                username: q!.username,
                password: q!.pin,
                password_confirmation: q!.pin,
            })
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                activation: res.body().data.activation,
                address: res.body().data.address,
                birthdate: res.body().data.birthdate,
                dept_id: res.body().data.dept_id,
                email: res.body().data.email,
                gender: res.body().data.gender,
                marital: res.body().data.marital,
                name: res.body().data.name,
                pin: res.body().data.pin,
                nik: res.body().data.nik,
                noktp: res.body().data.noktp,
                npwp: res.body().data.npwp,
                role_id: res.body().data.role_id,
                telp: res.body().data.telp,
                username: res.body().data.username,
                password: res.body().data.password,
            },
            msg: 'success'
        })
    })
}
export function update_validation() {
    test('users update validation test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await User.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .patch(`/api/users/${id}`)
            .fields({
                role_id: '',
                dept_id: '',
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                nik: '',
            })
            .file('avatar', '', '')
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