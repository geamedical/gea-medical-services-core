import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function validatepin() {
    test('data validate pin test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const res = await client
            .post(`/api/form-permintaan/validate-pin`)
            .form({
                "pin": "1234"
            })
            .loginAs(user!)
        res.assertStatus(200)
    })
}