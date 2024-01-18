import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AksesServerRepository from 'App/Controllers/Repositories/Permintaan-akses/AksesServerRepository';

export default class AksesServersController {
  private repository: any;
  constructor() {
    this.repository = new AksesServerRepository();
  }
  public async index({ bouncer, response, request }: HttpContextContract) {
    if (await bouncer.allows('read-server')) {
      const q = await this.repository.paginateRelation(request.all())
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async show({ bouncer, response, request }: HttpContextContract) {
    if (await bouncer.allows('read-server')) {
      await this.repository.find('id', request.param('id'))
      return response.status(200).send(request.all())
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async update({ bouncer, response, request, auth }: HttpContextContract) {
    if (await bouncer.allows('read-server')) {
      const q = await this.repository.find('id', request.param('id'))
      const update = {}
      update['user_id'] = q.res.data.user_id
      update['server_id'] = q.res.data.server_id
      update['authorization_id'] = q.res.data.authorization_id
      update['status'] = request.input('status')
      update['user_last_exec'] = auth.user!.id
      await this.repository.update(request.param('id'), update)
      return response.status(200).send(request.all())
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    if (await bouncer.allows('delete-server')) {
      const q = await this.repository.delete(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }
}
