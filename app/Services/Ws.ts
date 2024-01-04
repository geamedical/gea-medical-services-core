import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import Env from '@ioc:Adonis/Core/Env'

class Ws {
    public io: Server
    private booted = false
    private frontend:string;

    public boot() {
        if (this.booted) {
            return
        }
        if (Env.get('PORT_FRONTEND') === 'null') {
            this.frontend = `${Env.get('PROTOCOL_FRONTEND')}://${Env.get('HOST_FRONTEND')}`
        } else {
            this.frontend = `${Env.get('PROTOCOL_FRONTEND')}://${Env.get('HOST_FRONTEND')}:${Env.get('PORT_FRONTEND')}`
        }
        this.booted = true
        this.io = new Server(AdonisServer.instance, {
            cors: {
                origin: this.frontend,
                credentials: true,
            },
            allowEIO3: true
        })
    }
}
export default new Ws()
