import { test } from '@japa/runner'
import Permission from 'App/Models/Master-data/Permission'
import User from 'App/Models/User'

export default function show() {
    test('data show test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .get(`/api/permission/${id}`)
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                id: res.body().data.id,
                name: res.body().data.name,
                group_permission_id: res.body().data.group_permission_id,
                created_at: res.body().data.created_at,
                updated_at: res.body().data.updated_at,
            },
            msg: 'success'
        })
    })
}
