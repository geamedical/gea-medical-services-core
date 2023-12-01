import { schema,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class LoginValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    // email: schema.string([
    //   rules.email(),
    //   rules.normalizeEmail({
    //     allLowercase: true,
    //     gmailRemoveSubaddress: true,
    //   })
    // ]),
    username: schema.string(),
    password: schema.string([
      rules.minLength(4),
    ]),
  })
}
