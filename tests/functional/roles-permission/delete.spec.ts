import { test } from '@japa/runner'
import Role from 'App/Models/Master-data/Role'
import User from 'App/Models/User'

export default function destroy(title, url) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Role.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .delete(`/api/${url}/${id}`)
            .loginAs(user!)
        res.assertStatus(res.status())
        res.assertBodyContains(res.body())
    })
}