import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import GroupPermission from 'App/Models/Master-data/GroupPermission'
import Permission from 'App/Models/Master-data/Permission';
import RoleHasPermission from 'App/Models/Master-data/RoleHasPermission';

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    const trx = await Database.transaction()
    try {
      const groupPermission = [
        { name: 'user' },
        { name: 'role' },
        { name: 'permission' },
        { name: 'departement' },
        { name: 'form-permintaan' },
        { name: 'documentation' },
      ]
      groupPermission.forEach(async e => {
        const child = [
          { name: `create-${e.name}` },
          { name: `read-${e.name}` },
          { name: `update-${e.name}` },
          { name: `delete-${e.name}` }
        ]
        await Database.transaction(async (trx) => {
          const p1 = new GroupPermission()
          p1.name = e.name
          p1.useTransaction(trx)
          await p1.save()
          child.forEach(async el => {
            const s = new Permission()
            s.name = el.name
            await s.related('parent').associate(p1)
            await RoleHasPermission.create({ role_id: 1, permission_id: s.id })
          });
        })
      });
      await trx.transaction()
    } catch (error) {
      await trx.rollback()
      console.log(error);
    }
  }
}
