import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotificationRepository from 'App/Repositories/NotificationRepository';

export default class NotificationsController {
  private notifRepository: any;
  constructor() {
    this.notifRepository = new NotificationRepository();
  }
  public async index({ request, response, auth }: HttpContextContract) {
    const q = await this.notifRepository
      .notifPaginate(request.all(), auth.user!.id)
    return response.status(q.statCode).send(q.res)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ request, response }: HttpContextContract) {
    const q = await this.notifRepository
      .notifSetView(request.param('id'))
    return response.status(q.statCode).send(q.res)
  }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
