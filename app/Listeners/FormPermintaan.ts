import type { EventsList } from '@ioc:Adonis/Core/Event'
import Ws from 'App/Services/Ws';
import { sendWA } from 'App/helper';

export default class FormPermintaan {
    public async config(data: EventsList['notif:permintaan-akses']) {
        data['to'] = []
        data['user_target'].forEach(e => {
            if (e.users !== undefined) {
                e.users.forEach(async el => {
                    sendWA(data['message'], el.telp)
                    data['to'].push(el.id)
                });
            }
            sendWA(data['message'], e.telp)
            data['to'].push(e.id)
        });
        Ws.io.emit('notif:permintaan-akses', data)
    }
}
