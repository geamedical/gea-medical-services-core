import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dept from 'App/Models/Master-data/Dept'
import Role from 'App/Models/Master-data/Role'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'
import { DateTime } from 'luxon'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await UserFactory
      .createMany(100)
    const role1 = await Role.query()
      .where((q) => {
        q.where('company', 'MPM')
          .andWhere('code', 'SOFTWARE-ENGINER')
          .andWhere('rolename', 'Superadmin')
          .andWhere('coderole', 'SOFTWARE-ENGINER-Superadmin')
      }).first()
    const dept1 = await Dept.query()
      .where((q) => {
        q.where('company', 'RMP')
          .andWhere('code', 27)
          .andWhere('deptname', 'IT Programmer')
      }).first()

    const role2 = await Role.query()
      .where((q) => {
        q.where('company', 'MPM')
          .andWhere('code', 'MANAGER-IT-INFRA')
          .andWhere('rolename', 'Manager IT Infra')
          .andWhere('coderole', 'MANAGER-IT-INFRA-Manager-IT-Infra')
      }).first()
    const dept2 = await Dept.query()
      .where((q) => {
        q.where('company', 'RMP')
          .andWhere('code', 25)
          .andWhere('deptname', 'IT')
      }).first()
    await User.createMany([
      {
        role_id: role1!.id,
        dept_id: dept1!.id,
        name: 'Superadmin',
        nik: '001',
        pin: '1234',
        email: 'superadmin@test.tes',
        username: 'Superadmin',
        birthdate: DateTime.now(),
        gender: 'Male',
        marital: 'Married',
        npwp: '71.840.557.4-416.000',
        noktp: '0000000000000000',
        address: 'Dusun II RT002/RW000, Mandi Aur, Muara Kelinci',
        telp: '081212439564',
        password: '1234',
        activation: 'valid',
        islogin: 'n',
      },
      {
        role_id: role2!.id,
        dept_id: dept2!.id,
        name: 'Awi',
        nik: '002',
        pin: '1234',
        email: 'superadmin@test.tes',
        username: 'Awi',
        birthdate: DateTime.now(),
        gender: 'Male',
        marital: 'Married',
        npwp: '71.840.557.4-416.000',
        noktp: '0000000000000000',
        address: 'Dusun II RT002/RW000, Mandi Aur, Muara Kelinci',
        telp: '081212439564',
        password: '1234',
        activation: 'valid',
        islogin: 'n',
      },
    ])
  }
}
