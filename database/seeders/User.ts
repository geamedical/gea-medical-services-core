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
    const role = await Role.query()
      .where((q) => {
        q.where('company', 'RMP')
          .andWhere('code', 'SOFTWARE-ENGINER')
          .andWhere('rolename', 'Superadmin')
          .andWhere('coderole', 'SOFTWARE-ENGINER-Superadmin')
      }).first()
    const dept = await Dept.query()
      .where((q) => {
        q.where('company', 'RMP')
          .andWhere('code', 27)
          .andWhere('deptname', 'IT Programmer')
      }).first()
    await User.createMany([
      {
        role_id: role!.id,
        dept_id: dept!.id,
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
    ])
  }
}
