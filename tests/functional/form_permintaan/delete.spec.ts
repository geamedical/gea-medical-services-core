import { test } from '@japa/runner'
import FormPermintaanAkses from 'App/Models/Permintaan-akses/FormPermintaanAkses'
import User from 'App/Models/User'

export default function destroy() {
    test('data delete test', async ({ client }) => {
        const user = await User.query().where((query) => {
            query
                .where('nik', '001')
                .andWhere('email', 'superadmin@test.tes')
        }).first()
        const q = await FormPermintaanAkses.query().orderBy('id', 'desc').limit(1).first()
        if (q) {
            let id = q!.id
            const res = await client
                .delete(`/api/form-permintaan/${id}`)
                .loginAs(user!)
            res.assertStatus(200)
            res.assertBodyContains({
                status: true,
                data: res.body().data,
                msg: 'success'
            })
        }
    })
}