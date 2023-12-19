// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Form Permintaan module', () => {
//     test('store as new data test', async ({ client }) => {
//         const user = await User.query().where((query) => {
//             query
//                 .where('nik', '001')
//                 .andWhere('email', 'superadmin@test.tes')
//         }).first()
//         const res = await client
//             .post('/api/documentation')
//             .form({
//                 title: 'test',
//                 desc: '<strong>test</strong>',
//                 listep: [
//                     {
//                         id: 0,
//                         title: 'test',
//                         desc: '<strong>test</strong>'
//                     }
//                 ],
//                 mapstep: [
//                     {
//                         id: 1,
//                         step: 1,
//                         text: 'mulai-test'
//                     },
//                     {
//                         id: 2,
//                         step: 2,
//                         text: 'mulai-test'
//                     }
//                 ],
//                 flowchart: {
//                     chart: [
//                         {
//                             id: '0',
//                             x: 10,
//                             y: 50,
//                             width: 80,
//                             height: 40,
//                             name: "Mulai",
//                             type: "output",
//                             shape: "rect",
//                         },
//                         {
//                             id: '1',
//                             x: 200,
//                             y: 50,
//                             width: 100,
//                             height: 60,
//                             name: "Selesai",
//                             type: "output",
//                             shape: "rect",
//                         },
//                     ],
//                     flow: [
//                         {
//                             id: "0",
//                             source: { id: "0", position: "right" },
//                             destination: {
//                                 id: "1",
//                                 position: "left",
//                             },
//                             type: "step",
//                             style: { borderColor: "#b1b1b7", borderWidth: "2px" },
//                             markerEnd: "arrowclosed",
//                         },
//                     ],
//                 }
//             })
//             .loginAs(user!)
//         res.assertBodyContains({
//             status: true,
//             data: res.body().data,
//             msg: 'success',
//         })

//     })
// })
