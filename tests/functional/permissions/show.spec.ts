import { test } from '@japa/runner'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'

test.group('Permissions module', () => {
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
        console.log(res.body().data);

    })
})
