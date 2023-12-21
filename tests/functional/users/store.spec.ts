import { test } from '@japa/runner'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker';
import moment from 'moment';

export function store() {
    test('data store test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/users')
            .form({
                activation: 'valid',
                address: faker.location.streetAddress(),
                birthdate: moment(faker.date.birthdate()).format('YYYY-MM-DD'),
                dept_id: 1,
                email: faker.internet.email(),
                gender: 'Male',
                marital: 'Married',
                name: faker.internet.userName(),
                pin: faker.random.numeric(4),
                nik: faker.random.numeric(8),
                noktp: faker.random.numeric(15),
                npwp: faker.random.numeric(13),
                role_id: 1,
                telp: faker.random.numeric(12),
                username: faker.internet.userName(),
                password: '1234',
                password_confirmation: '1234',
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
                last_login: res.body().data.last_login,
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
            .post('/api/users')
            .form({
                role_id: '',
                dept_id: '',
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                nik: '',
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
