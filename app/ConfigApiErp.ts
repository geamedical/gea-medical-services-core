import Env from '@ioc:Adonis/Core/Env'
import axios from "axios"


interface State {
    bashUrl: string;
    account: any;
}
export default class ConfigApiErp {
    private state: State;
    constructor() {
        this.state = {
            bashUrl: `${Env.get('GEA_API_ERP')}`,
            account: {
                id: `${Env.get('GEA_API_ERP_ID')}`,
                key: `${Env.get('GEA_API_ERP_KEY')}`,
            }
        };
    }

    instanceTokenID() {
        const instance = axios.create({
            baseURL: `${this.state.bashUrl}`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return instance
    }
    instanceApiAfterToken(token: string) {
        const instance = axios.create({
            baseURL: `${this.state.bashUrl}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return instance
    }
    async GetInitialToken() {
        const res = {}
        await this.instanceTokenID().post('/api/hr', this.state.account)
            .then(response => {
                res['token'] = response.data.token
            })
            .catch(error => {
                res['errors'] = error
            })
        return res
    }
}