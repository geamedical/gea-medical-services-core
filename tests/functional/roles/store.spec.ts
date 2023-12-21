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
                company: faker.helpers.arrayElement(['RMP', 'ERKA', 'MPM', 'JKT', 'GAE', 'GLOBAL']),
                code: faker.random.alpha({ count: 5, casing: 'upper', bannedChars: ['A'] }),
                rolename: faker.internet.userName(),
                coderole: faker.random.alpha({ count: 5, casing: 'upper', bannedChars: ['A'] })
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
                company: '',
                code: '',
                rolename: '',
                coderole: '',
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
