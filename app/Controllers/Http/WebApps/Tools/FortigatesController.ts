import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import ServerFortigate from 'App/ServerFortigate';
import { GroupMembersValidator, GroupValidator, UserLocalValidator } from 'App/Validators/FortigateValidator';
import { responseErrors } from 'App/helper';

export default class FortigatesController {
  private fortigate: any;
  constructor() {
    this.fortigate = new ServerFortigate();
  }
  public async index({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("read-server")
    if (await bouncer.allows('read-server')) {
      const target = request.input('target')
      if (target) {
        if (request.input('attr') === 'user') {
          const user = await User.all()
          return response.ok(user)
        }
        if (request.input('attr') === 'group') {
          return await this.fortigate.ListUsersLocal()
        }
        return (target === 'group') ?
          await this.fortigate.ListGroup() :
          (target === 'user-local') ?
            await this.fortigate.ListUsersLocal() :
            await this.fortigate.ListUsersMembersLocal()
      }
      return response.status(422).send({ msg: 'target is required!', option: ['group', 'user-local', 'group-members'] })
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async store({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("create-server")
    if (await bouncer.allows('create-server')) {
      const target = request.input('target') //['group', 'user-local', 'group-members']
      try {
        if (target) {
          const payload = (target === 'user-local') ?
            await request.validate(UserLocalValidator) :
            (target === 'group') ? await request.validate(GroupValidator) :
              await request.validate(GroupMembersValidator)
          switch (target) {
            case 'user-local':
              const store_ul = await this.fortigate.StoreUserLocal(payload)
              return response.status(store_ul.status).send(store_ul.data)
            case 'group':
              const store_g = await this.fortigate.StoreGroup(payload)
              return response.status(store_g.status).send(store_g.data)
            case 'group-members':
              const store_gm = await this.fortigate.StoreMembersGroup(payload)
              return response.status(store_gm.status).send(store_gm.data)
          }
        }
        return response.status(422).send({ msg: 'target is required!', option: ['group', 'user-local', 'group-members'] })
      } catch (error) {
        return responseErrors(error.messages)
      }
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("read-server")
    if (await bouncer.allows('read-server')) {
      const target = request.input('target')
      if (target) {
        switch (target) {
          case 'user-local':
            const show_ul = await this.fortigate.ShowDetailUsersLocal(request.param('id'))
            return response.status(show_ul.status).send(show_ul.data)
          case 'group':
            const show_g = await this.fortigate.ShowDetailGroup(request.param('id'))
            return response.status(show_g.status).send(show_g.data)
          case 'group-members':
            return response.ok('undefined group-members show function!')
          default:
            return response.status(404).send({ msg: 'target options is undefined!', option: ['group', 'user-local', 'group-members'] })
        }
      }
      return response.status(422).send({ msg: 'target is required!', option: ['group', 'user-local', 'group-members'] })
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async update({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("update-server")
    if (await bouncer.allows('update-server')) {
      const target = request.input('target')
      if (target) {
        const payload = (target === 'user-local') ?
          await request.validate(UserLocalValidator) :
          (target === 'group') ? await request.validate(GroupValidator) :
            await request.validate(GroupMembersValidator)
        switch (target) {
          case 'user-local':
            const store_ul = await this.fortigate.UpdateUserLocal(request.param('id'), payload)
            return response.status(store_ul.status).send(store_ul.data)
          case 'group':
            const update_g = await this.fortigate.UpdateGroup(request.param('id'), payload)
            return response.status(update_g.status).send(update_g.data)
          case 'group-members':
            return response.ok('undefined group-members update function!')

          default:
            return response.status(404).send({ msg: 'target options is undefined!', option: ['group', 'user-local', 'group-members'] })
        }
      }
      return response.status(422).send({ msg: 'target is required!', option: ['group', 'user-local', 'group-members'] })
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }

  public async destroy({ response, request, bouncer }: HttpContextContract) {
    await bouncer.authorize("delete-server")
    if (await bouncer.allows('delete-server')) {
      const target = request.input('target')
      if (target) {
        switch (target) {
          case 'user-local':
            const del_ul = await this.fortigate.DeleteUsersLocal(request.param('id'))
            return response.status(del_ul.status).send(del_ul.data)
          case 'group':
            const del_g = await this.fortigate.DeleteGroup(request.param('id'))
            return response.status(del_g.status).send(del_g.data)
          case 'group-members':
            if (request.input('members')) {
              const del_gm = await this.fortigate.DeleteGroupMembers(request.param('id'), request.input('members'))
              return response.status(del_gm.status).send(del_gm.data)
            }
            return response.status(404).send({ msg: 'members is required!' })
          default:
            return response.status(404).send({ msg: 'target options is undefined!', option: ['group', 'user-local', 'group-members'] })
        }
      }
      return response.status(422).send({ msg: 'target is required!', option: ['group', 'user-local', 'group-members'] })
    }
    return response.unauthorized({ status: false, data: 'function is not allowed!', msg: 'unauthorized' })
  }
}
