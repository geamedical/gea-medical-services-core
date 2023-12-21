import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AksesFolderNasServerRepository from 'App/Repositories/Permintaan-akses/AksesFolderNasServerRepository';

export default class AksesFolderNasServersController {
  private repository: any;
  constructor() {
    this.repository = new AksesFolderNasServerRepository();
  }
  public async index({ response, request }: HttpContextContract) {
    const q = await this.repository.paginateRelation(request.all())
    return response.status(q.statCode).send(q.res)
  }

  public async show({ response, request }: HttpContextContract) {
    await this.repository.find('id', request.param('id'))
    return response.status(200).send(request.all())
  }

  public async update({ response, request }: HttpContextContract) {
    const input = request.all()
    const q = await this.repository.find('id', request.param('id'))
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
  }

  public async destroy({ request, response }: HttpContextContract) {
    const q = await this.repository.delete(request.param('id'))
    return response.status(q.statCode).send(q.res)
  }
}
