import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission';
import Role from 'App/Models/Role';
import RoleHasPermission from 'App/Models/RoleHasPermission';

export default class extends BaseSeeder {
  public async run() {
    const role = await Role.findByOrFail('coderole', 'SOFTWARE-ENGINER-Superadmin')
    const arr: any[] = []
    const p = await Permission.all()
    for (let i = 0; i < p.length; i++) {
      arr.push({
        role_id: role.id,
        permission_id: p[i].id
      })
    }
    if (arr.length > 0) {
      await RoleHasPermission.createMany(arr)
    }
  }
}
