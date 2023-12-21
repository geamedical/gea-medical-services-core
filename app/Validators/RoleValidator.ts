import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class RoleValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    company: schema.string(),
    code: schema.string(),
    rolename: schema.string(),
    coderole: schema.string()
  })
}
