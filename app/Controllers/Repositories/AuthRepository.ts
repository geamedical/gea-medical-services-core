import User from "App/Models/User";
import BaseRepository from "./BaseRepository";
import { FindUserAuthLocalDb, HeaderGeaApiServices, HeaderGeaApiServicesLogin, ParamsGeaApiServices, ParamsGeaApiServicesLogin, response, responseErrors, uniqueString } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";
import Role from "App/Models/Master-data/Role";
import Dept from "App/Models/Master-data/Dept";
import axios from "axios";
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from "luxon";

export default class AuthRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    async validateLoginSync(credential) {
        const resdata = {
            username: '',
            password: ''
        }
        try {
            await axios.post(`${Env.get('GEA_API_ERP')}/api/hr`, ParamsGeaApiServices(), HeaderGeaApiServices())
                .then(async (res) => {
                    await axios.post(`${Env.get('GEA_API_ERP')}/emp`,
                        ParamsGeaApiServicesLogin(credential.username, credential.password),
                        HeaderGeaApiServicesLogin(res.data.token))
                        .then(async (result) => {
                            if (result.data.data.length > 0) {
                                const dataUser = result.data.data[0]
                                const dept = await this.deptValidate(dataUser.div_desc)
                                const role = await this.roleValidate(dataUser.pos_desc)
                                dataUser['password'] = credential.password
                                dataUser['pin'] = credential.password
                                dataUser['activation'] = 'valid'
                                dataUser['username'] = credential.username
                                dataUser['islogin'] = 'y'
                                await this.createOrUpdateUser(dept, role, dataUser)
                                resdata.username = credential.username
                                resdata.password = credential.password
                            } else {
                                // cari ke db local
                                const find = await FindUserAuthLocalDb(credential.username, credential.password)
                                resdata.username = find?.statCode === 200 ? find.res.data.username : ''
                                resdata.password = find?.statCode === 200 ? find.res.data.password : ''
                            }
                        }).catch(async () => {
                            // cari ke db local
                            const find = await FindUserAuthLocalDb(credential.username, credential.password)
                            resdata.username = find?.statCode === 200 ? find.res.data.username : ''
                            resdata.password = find?.statCode === 200 ? find.res.data.password : ''
                        })
                }).catch(async () => {
                    // cari ke db local
                    const find = await FindUserAuthLocalDb(credential.username, credential.password)
                    resdata.username = find?.statCode === 200 ? find.res.data.username : ''
                    resdata.password = find?.statCode === 200 ? find.res.data.password : ''
                })
        } catch (err) {
            return responseErrors(err)
        } finally {
            return response(200, resdata)
        }
    }

    async deptValidate(deptname: string) {
        const cekdept = await Database
            .from('depts')
            .where('deptname', deptname)
            .count('*', 'total')
        if (cekdept[0].total > 0) {
            const deptUpdate = await Dept.findByOrFail('deptname', deptname)
            deptUpdate.deptname = deptname
            await deptUpdate.save()
            return deptUpdate.id
        } else {
            const deptCreate = new Dept
            deptCreate.company = 'new'
            deptCreate.code = uniqueString(5)
            deptCreate.deptname = deptname
            await deptCreate.save()
            return deptCreate.id
        }
    }
    async roleValidate(rolename: string) {
        const cekrole = await Database
            .from('roles')
            .where('rolename', rolename)
            .count('*', 'total')
        if (cekrole[0].total > 0) {
            const roleUpdate = await Role.findByOrFail('rolename', rolename)
            roleUpdate.rolename = rolename
            await roleUpdate.save()
            return roleUpdate.id
        } else {
            const roleCreate = new Role
            roleCreate.coderole = `${uniqueString(5)}-${rolename}`
            roleCreate.company = 'new'
            roleCreate.code = uniqueString(5)
            roleCreate.rolename = rolename
            await roleCreate.save()
            return roleCreate.id
        }
    }
    async createOrUpdateUser(dept: number, role: number, userdata: any) {
        const cekUser = await Database.from('users')
        .where('noktp', userdata.noktp)
        .andWhere('nik', userdata.emp_code)
        .count('* as total')
        if (cekUser[0].total > 0) {
            const update = await User.findByOrFail('noktp', userdata.noktp)
            update.dept_id = dept
            update.role_id = role
            update.name = userdata.emp_name
            update.pin = userdata.password
            update.nik = userdata.emp_code
            update.email = userdata.mail
            update.username = userdata.username
            update.birthdate = userdata.birthdate
            update.gender = userdata.gender
            update.marital = userdata.marital
            update.npwp = userdata.npwp
            update.noktp = userdata.noktp
            update.address = userdata.emp_add
            update.telp = userdata.tel
            update.password = userdata.password
            update.activation = userdata.activation
            update.islogin = userdata.islogin
            await update.save()
            return update
        } else {
            const create = new User
            create.dept_id = dept
            create.role_id = role
            create.name = userdata.emp_name
            create.pin = userdata.password
            create.nik = userdata.emp_code
            create.email = userdata.mail
            create.username = userdata.username
            create.birthdate = userdata.birthdate
            create.gender = userdata.gender
            create.marital = userdata.marital
            create.npwp = userdata.npwp
            create.noktp = userdata.noktp
            create.address = userdata.emp_add
            create.telp = userdata.tel
            create.password = userdata.password
            create.activation = userdata.activation
            create.islogin = userdata.islogin
            await create.save()
            return create
        }
    }

    async profile(userAuthId: number) {
        try {
            const fetch = await User.findOrFail(userAuthId)
            await fetch.save()
            const permission: string[] = [];
            const call = Database
                .from('role_has_permissions AS rhp')
                .join('permissions AS p', 'p.id', '=', 'rhp.permission_id')
                .join('roles AS r', 'rhp.role_id', '=', 'r.id')
                .join('users AS u', 'u.role_id', '=', 'r.id')
                .where('u.id', fetch.id)
                .select('p.name AS permissionsname');
            (await call).forEach(el => {
                permission.push(el.permissionsname)
            });
            const rolename = await Role.find(fetch.role_id)
            const deptname = await Dept.find(fetch.dept_id)
            const q = {
                "id": fetch.id,
                "role_name": rolename?.rolename,
                "dept_name": deptname?.deptname,
                "role_id": fetch.role_id,
                "dept_id": fetch.dept_id,
                "name": fetch.name,
                "pin": fetch.pin,
                "nik": fetch.nik,
                "email": fetch.email,
                "username": fetch.username,
                "birthdate": fetch.birthdate,
                "gender": fetch.gender,
                "marital": fetch.marital,
                "npwp": fetch.npwp,
                "noktp": fetch.noktp,
                "address": fetch.address,
                "telp": fetch.telp,
                "activation": fetch.activation,
            }
            return response(200, { user: q, permission })
        } catch (error) {
            return responseErrors(error)
        }
    }

    async updateProfile(id: number, payload: { role_id: number; dept_id: number; name: string; nik: string; email: string; username: string; birthdate: DateTime; gender: string; marital: string; npwp: string; noktp: string; address: string; telp: string; activation: boolean; }) {
        try {
            const q = await User.findOrFail(id)
            q.role_id = payload.role_id
            q.dept_id = payload.dept_id
            q.name = payload.name
            q.nik = payload.nik
            q.email = payload.email
            q.username = payload.username
            q.birthdate = payload.birthdate
            q.gender = payload.gender
            q.marital = payload.marital
            q.npwp = payload.npwp
            q.noktp = payload.noktp
            q.address = payload.address
            q.telp = payload.telp
            q.activation = payload.activation ? 'valid' : 'invalid'
            await q.save()
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
}
