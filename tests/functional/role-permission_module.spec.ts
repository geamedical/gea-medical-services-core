// import { test } from '@japa/runner'
// import RoleHasPermission from 'App/Models/RoleHasPermission'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//     test('role-permissions list test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/role-permission?page=${page}&limit=${limit}&sortDesc=${sortDesc}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         var datafetch: any[] = []
//         res.body().data.data.forEach((e: { id: any; role_id: any; permission_id: any; roles: { id: any; rolename: any; created_at: any; updated_at: any }; permission: { id: any; name: any; basepermission: any; created_at: any; updated_at: any } }) => {
//             datafetch.push({
//                 id: e.id,
//                 role_id: e.role_id,
//                 permission_id: e.permission_id,
//                 roles: {
//                     id: e.roles.id,
//                     rolename: e.roles.rolename,
//                     created_at: e.roles.created_at,
//                     updated_at: e.roles.updated_at
//                 },
//                 permission: {
//                     id: e.permission.id,
//                     name: e.permission.name,
//                     basepermission: e.permission.basepermission,
//                     created_at: e.permission.created_at,
//                     updated_at: e.permission.updated_at
//                 }
//             })
//         });
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 meta: {
//                     total: res.body().data.meta.total,
//                     per_page: res.body().data.meta.per_page,
//                     current_page: res.body().data.meta.current_page,
//                     last_page: res.body().data.meta.last_page,
//                     first_page: res.body().data.meta.first_page,
//                     first_page_url: res.body().data.meta.first_page_url,
//                     last_page_url: res.body().data.meta.last_page_url,
//                     next_page_url: res.body().data.meta.next_page_url,
//                     previous_page_url: res.body().data.meta.previous_page_url
//                 },
//                 data: datafetch
//             },
//             msg: 'success',
//         })
//     })

//     test('role-permissions store test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/role-permission')
//             .form({
//                 role_id: 6, permission_id: [16, 15, 14, 13]
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: { role_id: res.body().data.role_id, permission_id: res.body().data.permission_id },
//             msg: 'success'
//         })
//     })

//     test('role-permissions store validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/role-permission')
//             .form({
//                 role_id: null, permission_id: []
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

//     test('role-permissions show test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await RoleHasPermission.query().orderBy('role_id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/role-permission/${id}`)
//             .loginAs(user!)
//         var data: any[] = []
//         res.body().data.forEach((e: { id: number; role_id: number; permission_id: number }) => {
//             data.push({
//                 id: e.id,
//                 role_id: e.role_id,
//                 permission_id: e.permission_id,
//             })
//         });
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: data,
//             msg: 'success'
//         })
//     })

//     test('role-permissions edit test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await RoleHasPermission.query().orderBy('role_id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/role-permission/${id}`)
//             .loginAs(user!)
//         var data: any[] = []
//         res.body().data.forEach((e: { id: number; role_id: number; permission_id: number }) => {
//             data.push({
//                 id: e.id,
//                 role_id: e.role_id,
//                 permission_id: e.permission_id,
//             })
//         });
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: data,
//             msg: 'success'
//         })
//     })

//     test('role-permissions update test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await RoleHasPermission.query().orderBy('role_id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/role-permission/${id}`)
//             .form({
//                 role_id: 6, permission_id: [16, 15, 14, 13]
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: { role_id: res.body().data.role_id, permission_id: res.body().data.permission_id },
//             msg: 'success'
//         })
//     })

//     test('role-permissions update validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await RoleHasPermission.query().orderBy('role_id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/role-permission/${id}`)
//             .form({
//                 role_id: null, permission_id: []
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

//     test('role-permissions delete test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await RoleHasPermission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .delete(`/api/role-permission/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: { role_id: res.body().data.role_id, permission_id: res.body().data.permission_id },
//             msg: 'success'
//         })
//     })
// })
