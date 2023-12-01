import type { EventsList } from '@ioc:Adonis/Core/Event'
import Notification from 'App/Models/Notification';
import Ws from 'App/Services/Ws';
import Dept from 'App/Models/Dept';
import { sendWA } from 'App/helper';
import { string } from '@ioc:Adonis/Core/Helpers'
import User from 'App/Models/User';
import FormReqGa from 'App/Models/FormReqGa';

export default class FormPermintaan {
    public async store(data: EventsList['form:permintaan']) {
        const $getUserNotif = await Dept.query().whereIn('code', [3,5,25,26]).preload('users')
        $getUserNotif.forEach(e => {
            e.users.forEach(async el => {
                sendWA(`INFORMASI PERMINTAAN: Seseorang atas nama ${string.capitalCase(data.user.name)} telah melakukan permohonan permintaan dan menunggu konfirmasi anda. Periksa sekarang!`, el.telp)
                let html = '<v-list-item-title class="ml-3"><strong>Permohonan Permintaan</strong></v-list-item-title>'
                html += `<v-list-item-subtitle class="ml-3">User atas nama <strong>${string.capitalCase(data.user.name)}</strong> Melakukan permohonan permintaan</v-list-item-subtitle>`
                html += `<v-list-item-subtitle class="ml-3">Periksa sekarang</v-list-item-subtitle>`
                await Notification.create({
                    user_notif_target: el.id,
                    type: 'form-permintaan',
                    data_encode: html,
                    view: 'n',
                    icon: 'mdi-frequently-asked-questions',
                    color: 'primary',
                })
                data['user_target'] = el.id
                Ws.io.emit('form:permintaan', data)
            });
        });
    }
    public async setstatus(data: EventsList['form:permintaan:setstatus']) {
        const q = await User.findOrFail(data.user_id)
        const form = await FormReqGa.findOrFail(data.data_id)
        sendWA(`INFORMASI PERMINTAAN: Permohonan atas nama ${string.capitalCase(q.name)} telah diperbaharui dan menunggu konfirmasi anda. Periksa sekarang!`, q.telp)
        let html = '<v-list-item-title class="ml-3"><strong>Permohonan Permintaan</strong></v-list-item-title>'
        html += `<v-list-item-subtitle class="ml-3">Permintaan permohonan atas nama <strong>${string.capitalCase(q.name)}</strong> telah ditindak lanjut.</v-list-item-subtitle>`
        html += `<v-list-item-subtitle class="ml-3">Periksa sekarang</v-list-item-subtitle>`
        await Notification.create({
            user_notif_target: q.id,
            type: 'form-permintaan',
            data_encode: html,
            view: 'n',
            icon: 'mdi-frequently-asked-questions',
            color: 'secondary',
        })
        Ws.io.emit('form:permintaan:setstatus', { user: q, request: form })
    }
}
