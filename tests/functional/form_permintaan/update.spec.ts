import { test } from '@japa/runner'
import { faker } from '@faker-js/faker'
import Dept from 'App/Models/Master-data/Dept'
import FormPermintaanAkses from 'App/Models/Permintaan-akses/FormPermintaanAkses'
import User from 'App/Models/User'

export function update() {
    test('data update test', async ({ client }) => {
        const u = await FormPermintaanAkses.query().orderBy('id', 'asc').limit(1).first()
        if (u) {
            const q = await User.query().orderBy('id', 'asc').limit(1).first()
            const acc_pr = await Dept.query().where('deptname', 'HRGA').preload('users').first()
            const acc_sc = await Dept.query().where('deptname', 'IT').preload('users').first()
            if (acc_pr!.users.length > 0 && acc_sc!.users.length > 0) {
                const res = await client
                    .put(`/api/form-permintaan/${u!.id}`)
                    .form({
                        "user": {
                            "name": q!.name,
                            "telp": q!.telp,
                            "role_id": 1,
                            "dept_id": 1
                        },
                        "request": [
                            { "type": "email", "detail": faker.internet.email(), "notes": faker.internet.email() },
                            { "type": "akses-wifi", "detail": "test", "notes": "test" },
                            { "type": "akses-server", "detail": "test", "notes": "test" },
                            { "type": "lainya", "detail": "test", "notes": faker.lorem.lines() }
                        ],
                        "user_accepted": {
                            "accept_primary_id": acc_pr?.users[0]['id'],
                            "accept_secondary_id": acc_sc!.users.length > 0 ? acc_sc!.users[0]['id'] : acc_pr!.users[0]['id'],
                        }
                    })
                res.assertStatus(200)
                var request: any[] = []
                res.body().data.request.forEach(e => {
                    request.push({
                        type: e.type, detail: e.detail, notes: e.notes
                    })
                });
                res.assertBodyContains({
                    status: true,
                    data: {
                        user_accepted: { accept_primary_id: res.body().data.user_accepted.accept_primary_id, accept_secondary_id: res.body().data.user_accepted.accept_secondary_id },
                        user: { name: res.body().data.user.name, role_id: res.body().data.user.role_id, dept_id: res.body().data.user.dept_id, telp: res.body().data.user.telp },
                        request: request
                    },
                    msg: 'success',
                })
            }
        }
    })
}

export function update_validation() {
    test('data update validation test', async ({ client }) => {
        const u = await FormPermintaanAkses.query().orderBy('id', 'asc').limit(1).first()
        if (u) {
            const res = await client
                .put(`/api/form-permintaan/${u!.id}`)
                .form({
                    "user": {
                        "name": '',
                        "telp": '',
                        "role_id": '',
                        "dept_id": ''
                    },
                    "request": [
                        { "type": "", "detail": '', "notes": '' },
                    ],
                    "user_accepted": {
                        "accept_primary_id": '',
                        "accept_secondary_id": '',
                    }
                })
            res.assertStatus(200)
        }
    })
}