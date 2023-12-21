import { test } from '@japa/runner'
import User from 'App/Models/User'
import Role from 'App/Models/Master-data/Role';

export function store(title, url) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Role.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            const res = await client
                .post('/api/' + url)
                .form({
                    role_id: q!.id, permission_id: [1,2,3,4,5]
                })
                .loginAs(user!)
            res.assertStatus(200)
            res.assertBodyContains({
                status: true,
                data: res.body().data,
                msg: 'success'
            })
        }
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
                role_id: '', permission_id: []
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
