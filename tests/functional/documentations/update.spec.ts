import Documentation from "App/Models/Documentation"
import User from "App/Models/User"
import { test } from '@japa/runner'

test.group('Documentations module', () => {
    test('data update test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await Documentation.query().orderBy('id', 'desc').limit(1).first()
        let id = q!.id
        const res = await client
            .patch(`/api/documentation/${id}`)
            .form({
                title: 'test',
                desc: '<strong>test</strong>',
                listep: [
                    {
                        id: 0,
                        title: 'test',
                        desc: '<strong>test</strong>'
                    }
                ],
                mapstep: [
                    {
                        id: 1,
                        step: 1,
                        text: 'mulai-test'
                    },
                    {
                        id: 2,
                        step: 2,
                        text: 'mulai-test'
                    }
                ],
                flowchart: {
                    chart: [
                        {
                            id: '0',
                            x: 10,
                            y: 50,
                            width: 80,
                            height: 40,
                            name: "Mulai",
                            type: "output",
                            shape: "rect",
                        },
                        {
                            id: '1',
                            x: 200,
                            y: 50,
                            width: 100,
                            height: 60,
                            name: "Selesai",
                            type: "output",
                            shape: "rect",
                        },
                    ],
                    flow: [
                        {
                            id: "0",
                            source: { id: "0", position: "right" },
                            destination: {
                                id: "1",
                                position: "left",
                            },
                            type: "step",
                            style: { borderColor: "#b1b1b7", borderWidth: "2px" },
                            markerEnd: "arrowclosed",
                        },
                    ],
                }
            })
            .loginAs(user!)
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                id: res.body().data.id,
                title: res.body().data.title,
                desc: res.body().data.desc,
                created_at: res.body().data.created_at,
                updated_at: res.body().data.updated_at,
                listep: res.body().data.listep,
                map: res.body().data.map,
                flow: res.body().data.flow,
                chart: res.body().data.chart,
            },
            msg: 'success'
        })
    })
})