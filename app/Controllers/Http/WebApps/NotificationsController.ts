import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import NotificationView from 'App/Models/NotificationView'

export default class NotificationsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const q = await NotificationView.query()
      .where((query) => {
        query
          .where('status', 'n')
          .orWhere('status', 'w')
          .orWhere('status', 'waiting')
      })
      .andWhere('to', auth.user!.id)
      .preload('from_user')
      .preload('to_user')
      .paginate(request.input('page', 1), request.input('limit', 10))

    const count = await Database
      .from('notification')
      .where((query) => {
        query
          .where('status', 'n')
          .orWhere('status', 'w')
          .orWhere('status', 'waiting')
      })
      .andWhere('to', auth.user!.id)
      .count('* as total')
    return response.status(200).send({ pagination: q, count: count[0].total })
  }
}
