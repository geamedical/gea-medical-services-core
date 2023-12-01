import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class FormPermintaanValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
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
    )
  })
}
