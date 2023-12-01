import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentationRepository from 'App/Repositories/DocumentationRepository';
import { DocumentationValidator } from 'App/Validators/DocumentationValidator';

export default class DocumentationsController {
  private repository: any;
  constructor() {
    this.repository = new DocumentationRepository();
  }
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("read-documentation")
    if (await bouncer.allows('read-documentation')) {
      const q = await this.repository.docpaginate(request.all())
      return response.status(q.statCode).send(q.res)
    }
    const q = await this.repository.docpaginate(request.all())
    return response.status(q.statCode).send(q.res)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("create-documentation")
    if (await bouncer.allows('create-documentation')) {
      const payload = await request.validate(DocumentationValidator)
      const q = await this.repository.storeDoc(payload)
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async show({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("read-documentation")
    if (await bouncer.allows('read-documentation')) {
      const q = await this.repository.showDoc(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("update-documentation")
    if (await bouncer.allows('update-documentation')) {
      const payload = await request.validate(DocumentationValidator)
      const q = await this.repository.updateDoc(request.param('id'), payload)
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async destroy({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("delete-documentation")
    if (await bouncer.allows('delete-documentation')) {
      const q = await this.repository.delete(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }
}
