import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Master-data/Permission';
import Role from 'App/Models/Master-data/Role';
import RoleHasPermission from 'App/Models/Master-data/RoleHasPermission';

export default class extends BaseSeeder {
  public async run() {
    const role = await Role.findByOrFail('coderole', 'SOFTWARE-ENGINER-Superadmin')
    const arr: any[] = []
    const p = await Permission.all()
    p.forEach(e => {
      arr.push({
        role_id: role.id,
        permission_id: e.id
      })
    });

    if (arr.length > 0) {
      await RoleHasPermission.createMany(arr)
    }
  }
}
