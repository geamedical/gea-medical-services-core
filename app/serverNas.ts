import axios from "axios";
import Env from '@ioc:Adonis/Core/Env'

interface State {
    bashUrl: string;
}
export default class ServerNas {
    private state: State;
    constructor() {
        this.state = {
            bashUrl: `${Env.get('NAS_PROTOCOL')}://${Env.get('NAS_HOST')}:${Env.get('NAS_PORT')}/webapi`,
        };
    }

    async getSID() {
        const res = {
            sid: '',
            success: false
        }
        const fd = new URLSearchParams();
        fd.append('api', 'SYNO.API.Auth');
        fd.append('version', '3');
        fd.append('method', 'login');
        fd.append('account', 'alan');
        fd.append('passwd', 'Gea@2022medical#');
        fd.append('session', 'FileStation');
        fd.append('format', 'cookie');
        await axios.post(`${this.state.bashUrl}/auth.cgi`, fd, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                let sid = response.data.data.sid
                res.sid = sid
                res.success = true
            })
            .catch(err => {
                res.sid = err
                res.success = false
            })
        return res
    }

    async directoryFileStation() {
        let res = {
            status: 200,
            success: false,
            data: []
        }
        const t = await this.getSID()
        let tokenSid = t.success ? t.sid : ''
        let url = `${this.state.bashUrl}/entry.cgi/FileStation/file_share.cgi?api=SYNO.FileStation.List&version=1&method=list_share&_sid=${tokenSid}`
        await axios.get(url)
            .then(response => {
                res.status = 200
                res.success = true
                res.data = response.data.data.shares
            })
            .catch(error => {
                res.status = 400
                res.success = false
                res.data = error
            })
        return res
    }
}
