import { test } from '@japa/runner'
import NasDirPermission from 'App/Models/Permissiion/NasDirPermission'
import User from 'App/Models/User'


export function update(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await NasDirPermission.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            let id = q!.id
            const res = await client
                .patch(`/api/${url}/${id}`)
                .form({
                    primary_authorization_id: q.primary_authorization_id,
                    secondary_authorization_id: q.secondary_authorization_id,
                    dirname: q.dirname,
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
export function update_validation(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await NasDirPermission.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            let id = q!.id
            const res = await client
                .patch(`/api/${url}/${id}`)
                .form({
                    primary_authorization_id: '',
                    secondary_authorization_id: '',
                    dirname: '',
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
        }
    })
}