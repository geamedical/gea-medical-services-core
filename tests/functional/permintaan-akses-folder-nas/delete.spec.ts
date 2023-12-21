import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function destroy(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await User.query().orderBy('id', 'asc').limit(1).first()
        let id = q!.id
        const res = await client
            .delete(`/api/${url}/${id}`)
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: res.body().data,
            msg: 'success'
        })
    })
}