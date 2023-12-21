import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function logout() {
    test('logout test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client.post('/api/logout').loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: 'Success logout',
            msg: 'success',
        })
    })
}
