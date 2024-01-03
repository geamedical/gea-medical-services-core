import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessServerRequest from 'App/Models/Permintaan-akses/AccessServerRequest';
import ServerPermission from 'App/Models/Permissiion/ServerPermission';
import AksesFolderNasServerRepository from 'App/Repositories/Permintaan-akses/AksesFolderNasServerRepository';

export default class AksesFolderNasServersController {
  private repository: any;
  constructor() {
    this.repository = new AksesFolderNasServerRepository();
  }
  public async index({ response, request, bouncer }: HttpContextContract) {
    if (await bouncer.allows('read-nasserver')) {
      const q = await this.repository.paginateRelation(request.all())
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    if (await bouncer.allows('read-nasserver')) {
      await this.repository.find('id', request.param('id'))
      return response.status(200).send(request.all())
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async update({ response, request, bouncer }: HttpContextContract) {
    if (await bouncer.allows('read-nasserver')) {
      const input = request.all()
      const q = await this.repository.find('id', request.param('id'))
      const cariServerNas = await ServerPermission.query().where('server', 'LIKE', '%Nas%').first()
      const cek = await AccessServerRequest
        .query()
        .where((query) => {
          query
            .where('user_id', q.res.data.user_id)
            .andWhere('status', 'y')
            .andWhere('server_id', cariServerNas!.id)
        })
        .orderBy('created_at', 'desc')
        .first()
      if (cek) {
        if (cek.status === 'y') {
          const update = {}
          update['user_id'] = q.res.data.user_id
          update['nas_dir_permission_id'] = q.res.data.nas_dir_permission_id
          update['authorization_primary_id'] = q.res.data.authorization_primary_id
          if (input.column === 'authorization_primary_exec') {
            update['authorization_primary_axec'] = input.status
            if (input.status === 'approved' || input.status === 'rejected') {
              update['authorization_secondary_axec'] = input.status
            }
            update['status'] = input.status === 'approved' ? 'y' : input.status === 'rejected' ? 'n' : 'w'
          } else {
            update['authorization_secondary_axec'] = input.status
            update['status'] = input.status === 'approved' ? 'y' : input.status === 'rejected' ? 'n' : 'w'
          }
          update['authorization_secondary_id'] = q.res.data.user_id
          await this.repository.update(request.param('id'), update)
          return response.status(200).send(request.all())
        } else if (cek.status === 'n') {
          return response.abort('Maaf, Permintaan akses server anda ditolak, silahkan konfirmasi pada yang bersangkutan!')
        } else {
          return response.abort('Maaf, Permintaan akses server anda belum disetujui!')
        }
      }
      return response.abort('Maaf, Permintaan akses server anda belum disetujui!')
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    if (await bouncer.allows('delete-nasserver')) {
      const q = await this.repository.delete(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }
}
