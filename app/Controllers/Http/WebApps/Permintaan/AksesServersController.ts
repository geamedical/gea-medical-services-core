import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AksesServerRepository from 'App/Repositories/Permintaan/AksesServerRepository';

export default class AksesServersController {
  private repository: any;
  constructor() {
    this.repository = new AksesServerRepository();
  }
  public async index({ response, request }: HttpContextContract) {
    const q = await this.repository.paginateRelation(request.all())
    return response.status(q.statCode).send(q.res)
  }

  public async show({ response, request }: HttpContextContract) {
    console.log(request.all())
    return response.status(200).send(request.all())
  }

  public async update({ response, request }: HttpContextContract) {
    const q = await this.repository.find('id', request.param('id'))
    const update = {}
    update['user_id'] = q.res.data.user_id
    update['server_id'] = q.res.data.server_id
    update['authorization_id'] = q.res.data.authorization_id
    update['status'] = request.input('status')
    await this.repository.update(request.param('id'), update)
    return response.status(200).send(request.all())
  }

  public async destroy({ request, response }: HttpContextContract) {
    const q = await this.repository.delete(request.param('id'))
    return response.status(q.statCode).send(q.res)
  }
}
