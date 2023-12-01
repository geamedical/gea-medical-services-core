// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('User module', () => {
//     test('users list test', async ({ client }) => {
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
//         const res = await client.get(`/api/users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user!)
//         res.assertStatus(200)
//         var datafetch: any[] = []
//         res.body().data.data.forEach((e: { id: number; role_id: number; dept_id: number; name: string; nik: string; email: string; created_at: string; updated_at: string; roles: { id: number; rolename: string; created_at: string; updated_at: string }; dept: { id: number; deptname: string; created_at: string; updated_at: string } }) => {
//             datafetch.push({
//                 id: e.id,
//                 role_id: e.role_id,
//                 dept_id: e.dept_id,
//                 name: e.name,
//                 nik: e.nik,
//                 email: e.email,
//                 created_at: e.created_at,
//                 updated_at: e.updated_at,
//                 roles: {
//                     id: e.roles.id,
//                     rolename: e.roles.rolename,
//                     created_at: e.roles.created_at,
//                     updated_at: e.roles.updated_at
//                 },
//                 dept: {
//                     id: e.dept.id,
//                     deptname: e.dept.deptname,
//                     created_at: e.dept.created_at,
//                     updated_at: e.dept.updated_at
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
// })
