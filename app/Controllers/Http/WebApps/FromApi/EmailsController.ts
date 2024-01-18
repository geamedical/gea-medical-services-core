import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiEmail from 'App/ApiEmail';

export default class EmailsController {
  private api: any;
  constructor() {
    this.api = new ApiEmail();
  }
  public async index({response}: HttpContextContract) {
    const res = await this.api.ListEmail()
    return response.status(res.status).send(res.data)
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
