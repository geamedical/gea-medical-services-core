import ConfigApiErp from './ConfigApiErp';

export default class ApiEmail extends ConfigApiErp {
    async ListEmail() {
        let res ={}
        const getToken = await this.GetInitialToken()
        if (getToken['token'] !== undefined) {
        await this.instanceApiAfterToken(getToken['token']).get('/emp/email')
            .then(response => {
                res['status']=response.status
                res['data']=response.data.data
            })
            .catch(error => {
                res['status']=error.status
                res['data']=error.data
                console.log(error);
            })
            return res
        } else {
            return getToken['errors']
        }
    }
}