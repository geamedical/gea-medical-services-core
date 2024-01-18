import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Master-data/Permission';
import Role from 'App/Models/Master-data/Role';
import RoleHasPermission from 'App/Models/Master-data/RoleHasPermission';

export default class extends BaseSeeder {
  public async run() {
    const role1 = await Role.findByOrFail('coderole', 'SOFTWARE-ENGINER-Superadmin')
    const role2 = await Role.findByOrFail('coderole', 'MANAGER-IT-INFRA-Manager-IT-Infra')
    const arr: any[] = []
    const p = await Permission.all()
    p.forEach(e => {
      arr.push({
        role_id: role1.id,
        permission_id: e.id
      })
      arr.push({
        role_id: role2.id,
        permission_id: e.id
      })
    });

    if (arr.length > 0) {
      const allrole = await Role.query().where((q)=>{
        q
        .whereRaw('coderole != ?', ['SOFTWARE-ENGINER-Superadmin'])
        .orWhereRaw('coderole != ?', ['MANAGER-IT-INFRA-Manager-IT-Infra'])
      })
      const arrAll: any[] = []
      const perm = await Permission.query().whereIn(['name'],[
        ['read-role'],
        ['read-nasserver'],
        ['read-form-permintaan'],
        ['read-documentation'],
        ['read-server'],
        ['read-user'],
        ['read-departement'],
      ])
      allrole.forEach(async e => {
        perm.forEach(p => {
          if (e.id !== 1 && e.id !== 288 && e.id !== 289) {
            arrAll.push({
              role_id: e.id,
              permission_id: p.id
            })
          }
        });
      });
      if (arrAll.length > 0) {
        let mergedArray: any[] = [...arr, ...arrAll];
        await RoleHasPermission.createMany(mergedArray)
      }
    }
  }
}
