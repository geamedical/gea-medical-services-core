import { test } from '@japa/runner'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker';

export function store(title, url) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/' + url)
            .form({
                authorization_id: user!.id,
                server: faker.company.name()
            })
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: res.body().data,
            msg: 'success'
        })
    })
}

export function store_validation(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post('/api/' + url)
            .form({
                authorization_id: '',
                server: ''
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
