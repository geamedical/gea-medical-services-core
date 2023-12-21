import { test } from '@japa/runner'
import AccessServerRequest from 'App/Models/Permintaan-akses/AccessServerRequest'
import User from 'App/Models/User'


export default function update(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await AccessServerRequest.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            let id = q!.id
            const res = await client
                .patch(`/api/${url}/${id}`)
                .form({
                    status: 'y',
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