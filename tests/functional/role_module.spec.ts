// import { test } from '@japa/runner'
// import Role from 'App/Models/Role'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//     test('roles list test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const sortBy = 'id'
//         const search = ''
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/role?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         var datafetch: any[] = []
//         res.body().data.data.forEach((e: { id: number; rolename: string; created_at: string; updated_at: string }) => {
//             datafetch.push({
//                 id: e.id,
//                 rolename: e.rolename,
//                 created_at: e.created_at,
//                 updated_at: e.updated_at
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

//     test('roles store test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/role')
//             .form({
//                 rolename: 'Test',
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 rolename: res.body().data.rolename
//             },
//             msg: 'success'
//         })
//     })

//     test('roles store validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/role')
//             .form({
//                 rolename: '',
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

//     test('roles show test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Role.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/role/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 rolename: res.body().data.rolename,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })

//     test('roles edit test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Role.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/role/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 rolename: res.body().data.rolename,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })

//     test('roles update test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Role.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/role/${id}`)
//             .form({
//                 rolename: 'Test',
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 rolename: res.body().data.rolename
//             },
//             msg: 'success'
//         })
//     })

//     test('roles update validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Role.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/role/${id}`)
//             .form({
//                 rolename: '',
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

//     test('roles delete test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Role.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .delete(`/api/role/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 rolename: res.body().data.rolename,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })
// })
