import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class DeptValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    company: schema.string(),
    code: schema.string(),
    deptname: schema.string(),
  })
}
export class NasDirValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    primary_authorization_id: schema.number(),
    secondary_authorization_id: schema.number(),
    dirname: schema.string(),
  })
}
export class ServerPermissionValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    authorization_id: schema.number(),
    server: schema.string(),
  })
}
