import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import Env from '@ioc:Adonis/Core/Env'

class Ws {
    public io: Server
    private booted = false

    public boot() {
        /**
         * Ignore multiple calls to the boot method
         */
        if (this.booted) {
            return
        }

        this.booted = true
        this.io = new Server(AdonisServer.instance, {
            cors: {
                origin: `http://${Env.get('HOST_FRONTEND')}${Env.get('PORT_FRONTEND') !== '' ? ':' + Env.get('PORT_FRONTEND') : ''}`,
                credentials: true,
            },
            allowEIO3: true
        })
        // this.io = new Server(AdonisServer.instance!)
    }
}
export default new Ws()
