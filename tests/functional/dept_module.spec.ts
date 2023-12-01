// import { test } from '@japa/runner'
// import Dept from 'App/Models/Dept'
// import User from 'App/Models/User'

// test.group('Dept module', () => {
//     test('depts list test', async ({ client }) => {
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
//         const res = await client.get(`/api/dept?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         var datafetch: any[] = []
//         res.body().data.data.forEach((e: { id: number; deptname: string; created_at: string; updated_at: string }) => {
//             datafetch.push({
//                 id: e.id,
//                 deptname: e.deptname,
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
//             msg: 'list success',
//         })
//     })

//     test('depts store test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/dept')
//             .form({
//                 deptname: 'Test',
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 deptname: res.body().data.deptname
//             },
//             msg: 'store success'
//         })
//     })

//     test('depts store validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/dept')
//             .form({
//                 deptname: '',
//             })
//             .loginAs(user!)
//         var errors: any[] = []
//         res.body().data.errors.forEach((e: { rule: string; field: string; message: string }) => {
//             errors.push({
//                 rule: e.rule,
//                 field: e.field,
//                 message: e.message,
//             })
//         });
//         res.assertStatus(400)
//         res.assertBodyContains({
//             status: false,
//             data: {
//                 errors: errors
//             },
//             msg: 'store error'
//         })
//     })

//     test('depts show test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/dept/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 deptname: res.body().data.deptname,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'show success'
//         })
//     })

//     test('depts edit test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .get(`/api/dept/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 deptname: res.body().data.deptname,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'show success'
//         })
//     })

//     test('depts update test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/dept/${id}`)
//             .form({
//                 deptname: 'Test',
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 deptname: res.body().data.deptname
//             },
//             msg: 'update success'
//         })
//     })

//     test('depts update validation test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .patch(`/api/dept/${id}`)
//             .form({
//                 deptname: '',
//             })
//             .loginAs(user!)
//         var errors: any[] = []
//         res.body().data.errors.forEach((e: { rule: string; field: string; message: string }) => {
//             errors.push({
//                 rule: e.rule,
//                 field: e.field,
//                 message: e.message,
//             })
//         });
//         res.assertStatus(400)
//         res.assertBodyContains({
//             status: false,
//             data: {
//                 errors: errors
//             },
//             msg: 'update error'
//         })
//     })

//     test('depts delete test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const q = await Dept.query().orderBy('id', 'desc').limit(1).first()
//         let id = q!.id
//         const res = await client
//             .delete(`/api/dept/${id}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 id: res.body().data.id,
//                 deptname: res.body().data.deptname,
//                 created_at: res.body().data.created_at,
//                 updated_at: res.body().data.updated_at
//             },
//             msg: 'destroy success'
//         })
//     })
// })
