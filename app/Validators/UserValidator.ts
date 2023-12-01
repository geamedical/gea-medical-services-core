import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class UserValidatorStore extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    activation: schema.enum(['valid', 'invalid']),
    address: schema.string(),
    birthdate: schema.date({
      format: 'sql',
    }),
    dept_id: schema.number(),
    email: schema.string([rules.email()]),
    gender: schema.enum(['Male', 'Female', 'Other'] as const),
    marital: schema.enum(['Married', 'Unmarried', 'Other'] as const),
    name: schema.string(),
    pin: schema.string([rules.minLength(4), rules.maxLength(4)]),
    nik: schema.string({}, [
      rules.unique({ table: 'users', column: 'nik' })
    ]),
    noktp: schema.string(),
    npwp: schema.string(),
    role_id: schema.number(),
    telp: schema.string(),
    username: schema.string(),
    password: schema.string([
      rules.minLength(4),
      rules.confirmed(),
    ]),
  })
}

export class UserValidatorUpdate extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public refs = schema.refs({
    id: this.ctx.params.id
  })
  public schema = schema.create({
    activation: schema.enum(['valid', 'invalid']),
    address: schema.string(),
    birthdate: schema.date({
      format: 'sql',
    }),
    dept_id: schema.number(),
    email: schema.string.nullableAndOptional([rules.email()]),
    gender: schema.enum(['Male', 'Female', 'Other'] as const),
    marital: schema.enum(['Married', 'Unmarried', 'Other'] as const),
    name: schema.string(),
    pin: schema.string([rules.minLength(4), rules.maxLength(4)]),
    nik: schema.string({}, [
      rules.unique({ table: 'users', column: 'nik', whereNot: { id: this.refs.id } })
    ]),
    noktp: schema.string(),
    npwp: schema.string(),
    role_id: schema.number(),
    telp: schema.string(),
    username: schema.string(),
    password: schema.string([
      rules.minLength(4),
      rules.confirmed(),
    ]),
  })
}

export class AuthValidatorUpdate extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public refs = schema.refs({
    id: this.ctx.auth.user!.id
  })
  public schema = schema.create({
    activation: schema.boolean(),
    address: schema.string(),
    birthdate: schema.date({
      format: 'sql',
    }),
    dept_id: schema.number(),
    email: schema.string.nullableAndOptional([rules.email()]),
    gender: schema.enum(['Male', 'Female', 'Other'] as const),
    marital: schema.enum(['Married', 'Unmarried', 'Other'] as const),
    name: schema.string(),
    nik: schema.string({}, [
      rules.unique({ table: 'users', column: 'nik', whereNot: { id: this.refs.id } })
    ]),
    noktp: schema.string(),
    npwp: schema.string(),
    role_id: schema.number(),
    telp: schema.string(),
    username: schema.string(),
  })
}

export class PasswordValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    password: schema.string([
      rules.minLength(4),
      rules.confirmed(),
    ]),
  })
}
