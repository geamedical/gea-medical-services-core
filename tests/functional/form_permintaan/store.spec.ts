// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Form Permintaan module', () => {
//     test('store as new employe test', async ({ client }) => {
//         const res = await client
//             .post('/api/form-permintaan-nemp')
//             .form({
//                 "user": {
//                     "name": "test",
//                     "role_id": 1,
//                     "dept_id": 1
//                 },
//                 "request": [
//                     { "type": "email", "detail": "test", "notes": "test" },
//                     { "type": "akses-wifi", "detail": "test", "notes": "test" },
//                     { "type": "akses-server", "detail": "test", "notes": "test" },
//                     { "type": "lainya", "detail": "test", "notes": "test" }
//                 ]
//             })
//         res.assertStatus(200)
//         var request: any[] = []
//         res.body().data.request.forEach(e => {
//             request.push({
//                 type: e.type, detail: e.detail, notes: e.notes
//             })
//         });
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 user: { name: 'test', role_id: 1, dept_id: 1 },
//                 request: request
//             },
//             msg: 'success',
//         })
//     })
//     test('store authorization test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/form-permintaan')
//             .form({
//                 "user": {
//                     "name": "test",
//                     "role_id": 1,
//                     "dept_id": 1
//                 },
//                 "request": [
//                     { "type": "email", "detail": "test", "notes": "test" },
//                     { "type": "akses-wifi", "detail": "test", "notes": "test" },
//                     { "type": "akses-server", "detail": "test", "notes": "test" },
//                     { "type": "lainya", "detail": "test", "notes": "test" }
//                 ]
//             })
//             .loginAs(user!)
//         res.assertStatus(200)
//         var request: any[] = []
//         res.body().data.request.forEach((e: { type: any; detail: any; notes: any }) => {
//             request.push({
//                 type: e.type, detail: e.detail, notes: e.notes
//             })
//         });
//         res.assertBodyContains({
//             status: true,
//             data: {
//                 user: { name: 'test', role_id: 1, dept_id: 1 },
//                 request: request
//             },
//             msg: 'success',
//         })
//     })
// })
