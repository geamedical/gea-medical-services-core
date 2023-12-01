// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('User module', () => {
//     test('users store test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/users')
//             .form({
//                 role_id: 1,
//                 dept_id: 1,
//                 name: 'Test',
//                 email: 'Test@test.test',
//                 nik: '002',
//                 password: '123456',
//                 password_confirmation: '123456',
//             })
//             .loginAs(user!)
//         if (res.status() === 200) {
//             res.assertStatus(200)
//             res.assertBodyContains({
//                 status: true,
//                 data: {
//                     role_id: res.body().data.role_id,
//                     dept_id: res.body().data.dept_id,
//                     name: res.body().data.name,
//                     email: res.body().data.email,
//                     nik: res.body().data.nik,
//                     password: res.body().data.password,
//                     password_confirmation: res.body().data.password_confirmation,
//                 },
//                 msg: 'success'
//             })
//         } else {
//             res.assertStatus(400)
//             res.assertBodyContains({
//                 status: false,
//                 data: {
//                     code: res.body().data.code,
//                     errno: res.body().data.errno,
//                     sqlState: res.body().data.sqlState,
//                     sqlMessage: res.body().data.sqlMessage,
//                     sql: res.body().data.sql
//                 },
//                 msg: 'error'
//             })
//         }
//     })

//     test('users store validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/users')
//             .form({
//                 role_id: '',
//                 dept_id: '',
//                 name: '',
//                 email: '',
//                 password: '',
//                 password_confirmation: '',
//                 nik: '',
//             })
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
