import { test } from '@japa/runner'
import User from 'App/Models/User'

export default function list(title: string, url: string) {
    test(title, async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const sortBy = 'id'
        const search = ''
        const sortDesc = true
        const page = 1
        const limit = 10
        const res = await client.get(`/api/${url}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains(res.body())
    })
}
