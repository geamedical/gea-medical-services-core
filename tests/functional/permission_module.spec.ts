// import { test } from '@japa/runner'
// import Permission from 'App/Models/Permission'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//     test('permissions list test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const sortBy = 'id'
//         const search = ''
//         const between = '2023-01-08, 2023-02-09'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/permission?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         var datafetch: any[] = []
//         res.body().data.data.forEach((e: { id: number; name: string; basepermission: string; created_at: string; updated_at: string }) => {
//             datafetch.push({
//                 id: e.id,
//                 name: e.name,
//                 basepermission: e.basepermission,
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

//     test('permissions store test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/permission')
//             .form({
//                 name: 'Test',
//                 permission: ['create', 'read', 'update', 'delete', 'export', 'import']
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 name: res.body().data.name,
//                 permission: res.body().data.permission
//             },
//             msg: 'success'
//         })
//     })

//     test('permissions store validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/permission')
//             .form({
//                 name: '',
//                 permission: []
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
//         res.assertBodyContains({errors})
//     })

//     test('permissions show test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/permission/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 name: res.body().data.name,
//                 basepermission: res.body().data.basepermission,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })

//     test('permissions edit test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/permission/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 name: res.body().data.name,
//                 basepermission: res.body().data.basepermission,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })

//     test('permissions update test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/permission/${id}`)
//             .form({
//                 name: 'Test',
//                 permission: ['create', 'read', 'update', 'delete', 'export', 'import']
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 name: res.body().data.name,
//                 permission: res.body().data.permission
//             },
//             msg: 'success'
//         })
//     })

//     test('permissions update validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/permission/${id}`)
//             .form({
//                 name: '',
//                 permission: []
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
//         res.assertBodyContains({errors})
//     })

//     test('permissions delete test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Permission.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .delete(`/api/permission/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 name: res.body().data.name,
//                 basepermission: res.body().data.basepermission,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'success'
//         })
//     })
// })
