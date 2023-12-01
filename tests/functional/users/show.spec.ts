// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('User module', () => {
//     test('users show test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await User.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/users/${id}`)
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
//                 updated_at: res.body().data.updated_at,
//                 roles: {
//                     id: res.body().data.roles.id,
//                     rolename: res.body().data.roles.rolename,
//                     created_at: res.body().data.roles.created_at,
//                     updated_at: res.body().data.roles.updated_at
//                 },
//                 dept: {
//                     id: res.body().data.dept.id,
//                     deptname: res.body().data.dept.deptname,
//                     created_at: res.body().data.dept.created_at,
//                     updated_at: res.body().data.dept.updated_at
//                 }
//             },
//             msg: 'success'
//         })
//     })

//     test('users edit test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await User.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/users/${id}`)
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
//                 updated_at: res.body().data.updated_at,
//                 roles: {
//                     id: res.body().data.roles.id,
//                     rolename: res.body().data.roles.rolename,
//                     created_at: res.body().data.roles.created_at,
//                     updated_at: res.body().data.roles.updated_at
//                 },
//                 dept: {
//                     id: res.body().data.dept.id,
//                     deptname: res.body().data.dept.deptname,
//                     created_at: res.body().data.dept.created_at,
//                     updated_at: res.body().data.dept.updated_at
//                 }
//             },
//             msg: 'success'
//         })
//     })
// })
