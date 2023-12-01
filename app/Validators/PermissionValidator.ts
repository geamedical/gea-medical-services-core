import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class PermissionValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    name: schema.string(),
    permission: schema
    .array([
      rules.minLength(1),
      rules.maxLength(6)
    ])
    .members(schema.string()),  
  })
}
