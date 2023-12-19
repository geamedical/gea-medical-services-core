import { schema,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class LoginValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    username: schema.string(),
    password: schema.string([
      rules.minLength(4),
    ]),
  })
}
