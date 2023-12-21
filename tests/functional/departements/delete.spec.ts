import { test } from '@japa/runner'
import Dept from 'App/Models/Master-data/Dept'
import User from 'App/Models/User'

export default function destroy() {
    test('data delete test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Dept.query().orderBy('id', 'asc').limit(1).first()
        if (q) {
            const res = await client
                .delete(`/api/dept/${q!.id}`)
                .loginAs(user!)
            res.assertStatus(res.status())
            res.assertBodyContains({
                status: res.body().status,
                data: res.body().data,
                msg: res.body().msg
            })
        }
    })
}