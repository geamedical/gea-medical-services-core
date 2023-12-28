import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dept from 'App/Models/Master-data/Dept'
import ServerPermission from 'App/Models/Permissiion/ServerPermission'

export default class PemissionServer extends BaseSeeder {
  public async run() {
    const userIT = await Dept.query().where('deptname', 'IT').preload('users').first()
    const datadepartements = [
      {
        authorization_id: userIT!.users[0].id,
        server: 'Server Nas',
      },
    ]
    await ServerPermission.createMany(datadepartements)
  }
}
