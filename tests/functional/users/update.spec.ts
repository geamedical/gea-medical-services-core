// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('User module', () => {
//     test('users update test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await User.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/users/${id}`)
//             .form({
//                 role_id: q!.role_id,
//                 dept_id: q!.dept_id,
//                 name: q!.name,
//                 email: q!.email,
//                 password: '123456',
//                 password_confirmation: '123456',
//                 nik: q!.nik,
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 role_id: res.body().data.role_id,
//                 dept_id: res.body().data.dept_id,
//                 name: res.body().data.name,
//                 email: res.body().data.email,
//                 password: res.body().data.password,
//                 nik: res.body().data.nik,
//             },
//             msg: 'success'
//         })
//     })

//     test('users update validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await User.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/users/${id}`)
//             .fields({
//                 role_id: '',
//                 dept_id: '',
//                 name: '',
//                 email: '',
//                 password: '',
//                 password_confirmation: '',
//                 nik: '',
//             })
//             .file('avatar', '', '')
//             .loginAs(user!)
//         var errors: any[] = []
//         res.body().errors.forEach((e: { rule: string; field: string; message: string }) => {
//             errors.push({
//                 rule: e.rule,
//                 field: e.field,
//                 message: e.message,
//             })
//         });
//         res.assertStatus(422)
//         res.assertBodyContains({ errors })
//     })
// })