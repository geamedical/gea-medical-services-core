import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class UserLocalValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    name: schema.string(),
    passwd: schema.string([rules.confirmed(), rules.minLength(4)]),
    status: schema.enum(['enable', 'disable']),
  })
}
export class GroupValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    name: schema.string(),
    q_origin_key: schema.string(),
  })
}
export class GroupMembersValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    group_members: schema.array().members(schema.object().members({
      name: schema.string(),
      q_origin_key: schema.string(),
    })),
    groupname: schema.string(),
  })
}
