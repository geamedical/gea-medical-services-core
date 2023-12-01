// import { test } from '@japa/runner'
// import User from 'App/Models/User'


// test.group('Auth module', () => {

//     test('login test', async ({ client }) => {
//         const res = await client.post('/api/login').form({
//             email: 'superadmin@test.tes',
//             password: '123456'
//         })
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 type: 'bearer',
//                 token: res.body().data.token,
//                 expires_at: res.body().data.expires_at
//             },
//             msg: 'login success',
//         })
//     })

//     test('auth profile test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client.get('/api/profile').loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 user: res.body().data.user,
//                 permission: res.body().data.permission
//             },
//             msg: 'success',
//         })
//     })

//     test('auth profile update not password test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client.post('/api/profile-update')
//             .loginAs(user!)
//             .form({
//                 role_id: user!.role_id,
//                 dept_id: user!.dept_id,
//                 name: user!.name,
//                 email: user!.email,
//                 nik: user!.nik,
//             })
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: res.body().data,
//             msg: 'success',
//         })
//     })

//     test('auth profile update with password test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client.post('/api/profile-update')
//             .loginAs(user!)
//             .form({
//                 role_id: user!.role_id,
//                 dept_id: user!.dept_id,
//                 name: user!.name,
//                 email: user!.email,
//                 password: '123456',
//                 password_confirmation: '123456',
//                 nik: user!.nik,
//             })
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: res.body().data,
//             msg: 'success',
//         })
//     })

//     test('auth logout test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client.post('/api/logout').loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: 'Success logout',
//             msg: 'success',
//         })
//     })
// })
