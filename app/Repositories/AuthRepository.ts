import User from "App/Models/User";
import BaseRepository from "./BaseRepository";
import { FindUserAuthLocalDb, HeaderGeaApiServices, HeaderGeaApiServicesLogin, ParamsGeaApiServices, ParamsGeaApiServicesLogin, response, responseErrors } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";
import Role from "App/Models/Role";
import Dept from "App/Models/Dept";
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
                                const dept = await Dept.updateOrCreate({
                                    deptname: dataUser.div_desc
                                }, {
                                    deptname: dataUser.div_desc
                                })
                                const role = await Role.updateOrCreate({
                                    rolename: dataUser.pos_desc
                                }, {
                                    rolename: dataUser.pos_desc
                                })
                                const $datausersave = {
                                    role_id: role.id,
                                    dept_id: dept.id,
                                    name: dataUser.emp_name,
                                    pin: credential.password,
                                    nik: dataUser.emp_code,
                                    email: dataUser.mail,
                                    username: dataUser.emp_name,
                                    birthdate: dataUser.birthdate,
                                    gender: dataUser.gender,
                                    marital: dataUser.marital,
                                    npwp: dataUser.npwp,
                                    noktp: dataUser.noktp,
                                    address: dataUser.emp_add,
                                    telp: dataUser.tel,
                                    password: credential.password,
                                    activation: 'valid',
                                    islogin: 'y'
                                }
                                const $user = await User.updateOrCreate({
                                    noktp: dataUser.noktp,
                                }, $datausersave)
                                resdata.username = $user.username
                                resdata.password = credential.password
                            } else {
                                // cari ke db local
                                const find = await FindUserAuthLocalDb(credential.username, credential.password)
                                if (find?.statCode === 200) {
                                    resdata.username = find.res.data.username
                                    resdata.password = find.res.data.password
                                } else {
                                    resdata.username = ''
                                    resdata.password = ''
                                }
                            }
                        }).catch(async () => {
                            // cari ke db local
                            const find = await FindUserAuthLocalDb(credential.username, credential.password)
                            if (find?.statCode === 200) {
                                resdata.username = find.res.data.username
                                resdata.password = find.res.data.password
                            } else {
                                resdata.username = ''
                                resdata.password = ''
                            }
                        })
                }).catch(async () => {
                    // cari ke db local
                    const find = await FindUserAuthLocalDb(credential.username, credential.password)
                    if (find?.statCode === 200) {
                        resdata.username = find.res.data.username
                        resdata.password = find.res.data.password
                    } else {
                        resdata.username = ''
                        resdata.password = ''
                    }
                })
        } catch (err) {
            return responseErrors(err)
        } finally {
            return response(200, resdata)
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
            console.log(id, payload);
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
