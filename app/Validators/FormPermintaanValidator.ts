import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class FormPermintaanValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    user_accepted: schema.object().members({
      accept_primary_id: schema.number(),
      accept_secondary_id: schema.number()
    }),
    user: schema.object().members({
      name: schema.string(),
      telp: schema.string([
        rules.minLength(12),
        rules.maxLength(13)
      ]),
      role_id: schema.number(),
      dept_id: schema.number()
    }),
    request: schema.array([
      rules.minLength(1),
    ]).members(
      schema.object().members({
        type: schema.enum(['email', 'akses-wifi', 'akses-server', 'lainya']),
        detail: schema.string(),
        notes: schema.string()
      })
    ),
    directory: schema.array.optional([
      rules.minLength(1),
    ]).members(
      schema.object().members({
        id: schema.number(),
        primary_authorization_id: schema.number(),
        secondary_authorization_id: schema.number(),
        dirname: schema.string(),
      })
    ),
    server: schema.array.optional([
      rules.minLength(1),
    ]).members(
      schema.object().members({
        id: schema.number(),
        authorization_id: schema.number(),
        server: schema.string(),
      })
    )
  })
}
