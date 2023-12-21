import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import FormPermintaanAkses from 'App/Models/Permintaan-akses/FormPermintaanAkses'
import User from 'App/Models/User'

export function setStatus_secondary_approved() {
    test('data set status status_secondary approve test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const u = await FormPermintaanAkses.query().orderBy('id', 'asc').limit(1).first()
        if (u) {
            const res = await client
                .put(`/api/form-permintaan/${u!.id}`)
                .form({
                    "status": "y",
                    "column": "status_secondary"
                })
                .loginAs(user!)
            res.assertStatus(200)
        }
    })
}
export function setStatus_primary_approved() {
    test('data set status status_primary approve test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const u = await FormPermintaanAkses.query().orderBy('id', 'asc').limit(1).first()
        if (u) {
            const res = await client
                .put(`/api/form-permintaan/${u!.id}`)
                .form({
                    "status": "y",
                    "column": "status_primary"
                })
                .loginAs(user!)
            res.assertStatus(200)
        }
    })
}
export function setStatus_feedback_approved() {
    test('data set status status_feedback approve test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const u = await FormPermintaanAkses.query().orderBy('id', 'asc').limit(1).first()
        if (u) {
            const res = await client
                .put(`/api/form-permintaan/${u!.id}`)
                .form({
                    "status": "y",
                    "column": "status_feedback",
                    "msg": faker.lorem.lines()
                })
                .loginAs(user!)
            res.assertStatus(200)
        }
    })
}