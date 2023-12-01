import type { EventsList } from '@ioc:Adonis/Core/Event'
import Notification from 'App/Models/Notification'
import Ws from 'App/Services/Ws'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class User {
    public async authLoginUser(user: EventsList['auth-login:user']) {
        let html = '<v-list-item-title class="ml-3"><strong>Authenticated</strong></v-list-item-title>'
        html += `<v-list-item-subtitle class="ml-3">User atas nama <strong>${string.capitalCase(user.name)}</strong> telah online</v-list-item-subtitle>`
        await Notification.create({
            type: 'lainya',
            data_encode: html,
            view: 'n',
            icon: 'mdi-login',
            color: 'accent',
        })
        return Ws.io.emit('auth-login:user', user)
    }
    public async authLogoutUser(user: EventsList['auth-logout:user']) {
        let html = '<v-list-item-title class="ml-3"><strong>Authenticated</strong></v-list-item-title>'
        html += `<v-list-item-subtitle class="ml-3">User atas nama <strong>${string.capitalCase(user.name)}</strong> telah offline</v-list-item-subtitle>`
        await Notification.create({
            type: 'lainya',
            data_encode: html,
            view: 'n',
            icon: 'mdi-logout',
            color: 'error',
        })
        return Ws.io.emit('auth-logout:user', user)
    }
}
