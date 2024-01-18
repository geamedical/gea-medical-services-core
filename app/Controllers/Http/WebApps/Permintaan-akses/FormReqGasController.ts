import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormPermintaanRepository from 'App/Controllers/Repositories/Permintaan-akses/FormPermintaanRepository';
import FormPermintaanValidator from 'App/Validators/FormPermintaanValidator';

export default class FormReqGasController {
  private repository: any;
  constructor() {
    this.repository = new FormPermintaanRepository();
  }
  public async index({ bouncer, response, request }: HttpContextContract) {
    const input = request.all()
    if (input['server-permission']) {
      const q = await this.repository.getSrvPermission()
      return response.status(q.statCode).send(q.res)
    }
    if (input['dir-permission']) {
      const q = await this.repository.getDirPermission()
      return response.status(q.statCode).send(q.res)
    }
    await bouncer.authorize("read-form-permintaan")
    if (await bouncer.allows('read-form-permintaan')) {
      const q = await this.repository.paginateData(input)
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(FormPermintaanValidator)
    const q = await this.repository.storeForm(payload)
    return response.status(q.statCode).send(q.res)
  }

  public async show({ bouncer, response, request }: HttpContextContract) {
    await bouncer.authorize("read-form-permintaan")
    if (await bouncer.allows('read-form-permintaan')) {
      const q = await this.repository.findForm(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async update({ bouncer, request, response, auth }: HttpContextContract) {
    const input = request.all()
    if (input['status'] !== undefined && input['column'] !== undefined) {
      const q = await this.repository.setStatus(request.all(), auth.user)
      return response.status(q.statCode).send(q.res)
    }
    if (await bouncer.allows('update-form-permintaan')) {
      const q = await this.repository.updateForm(request.param('id'), request.all())
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async destroy({ bouncer, response, request }: HttpContextContract) {
    await bouncer.authorize("delete-form-permintaan")
    if (await bouncer.allows('delete-form-permintaan')) {
      const q = await this.repository.deleteall(request.param('id'))
      return response.status(q.statCode).send(q.res)
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async ValidatePin({ response, request }: HttpContextContract) {
    const q = await this.repository.validatePin(request.all())
    return response.status(q.statCode).send(q.res)
  }

  public async formset({ response, auth }: HttpContextContract) {
    const q = await this.repository.attrForm(auth.user!)
    return response.status(q.statCode).send(q.res)
  }
}
