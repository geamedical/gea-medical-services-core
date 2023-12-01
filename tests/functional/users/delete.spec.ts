// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('User module', () => {
//     test('users delete test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await User.query().orderBy('id', 'asc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .delete(`/api/users/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 role_id: res.body().data.role_id,
//                 dept_id: res.body().data.dept_id,
//                 name: res.body().data.name,
//                 nik: res.body().data.nik,
//                 email: res.body().data.email,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })
// })