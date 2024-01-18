import axios from "axios"
import https from "https"
import Env from '@ioc:Adonis/Core/Env'

interface State {
    bashUrl: string;
    token: string;
}
export default class ServerFortigate {
    private state: State;
    constructor() {
        this.state = {
            bashUrl: `${Env.get('FORTIGATE_PROTOCOL')}://${Env.get('FORTIGATE_HOST')}:${Env.get('FORTIGATE_PORT')}/api/v2/cmdb`,
            token: `${Env.get('FORTIGATE_TOKEN')}`
        };
    }

    instance() {
        const instance = axios.create({
            baseURL: `${this.state.bashUrl}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        return instance
    }

    // USERS LOCAL :: STARTED
    async ListUsersLocal() {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().get('/user/local')
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async StoreUserLocal(input: any) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().post('/user/local', input)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async UpdateUserLocal(id: string, input: any) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().put(`/user/local/${id}`, input)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async ShowDetailUsersLocal(name: string) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().get(`/user/local/${name}`)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async DeleteUsersLocal(name: string) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().delete(`/user/local/${name}`)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    // USERS LOCAL :: ENDED

    // GROUP USERS :: STARTED
    async ListGroup() {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().get('/user/group')
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async StoreGroup(input) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().post('/user/group', input)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async ShowDetailGroup(id: string) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().get(`/user/group/${id}`)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async UpdateGroup(id: string, input: any) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().put(`/user/group/${id}`, input)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    async DeleteGroup(id: string) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().delete(`/user/group/${id}`)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    // GROUP USERS :: ENDED

    // GROUP USERS MEMBERS :: STARTED
    async ListUsersMembersLocal() {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().get('/user/group')
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                console.log(error);
                res.status = error.response.status
                res.success = false
                res.data = error
            })
        return res
    }
    async StoreMembersGroup(input) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        for (let i = 0; i < input.group_members.length; i++) {
            await this.instance().post(`/user/group/${input.groupname}/member`, input.group_members[i])
                .then(response => {
                    res.status = response.status
                    res.success = true
                    res.data = response.data.results
                })
                .catch(error => {
                    res.status = error.response.status
                    res.success = false
                    res.data = error.message
                })
        }

        return res
    }
    async DeleteGroupMembers(groupname, membername) {
        const res = {
            status: 500,
            success: false,
            data: []
        }
        await this.instance().delete(`/user/group/${groupname}/member/${membername}`)
            .then(response => {
                res.status = response.status
                res.success = true
                res.data = response.data.results
            })
            .catch(error => {
                res.status = error.response.status
                res.success = false
                res.data = error.message
            })
        return res
    }
    // GROUP USERS MEMBERS :: ENDED
}
