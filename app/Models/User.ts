import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Master-data/Role'
import Dept from './Master-data/Dept'
import FormPermintaanAkses from './Permintaan-akses/FormPermintaanAkses'
import AccessServerRequest from './Permintaan-akses/AccessServerRequest'
import AccessNasDirectoryRequest from './Permintaan-akses/AccessNasDirectoryRequest'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public role_id: number
  @column()
  public dept_id: number
  @column()
  public name: string
  @column()
  public nik: string
  @column()
  public pin: string
  @column()
  public email: string
  @column()
  public username: string
  @column.date()
  public birthdate: DateTime
  @column()
  public gender: string
  @column()
  public marital: string
  @column()
  public npwp: string
  @column()
  public noktp: string
  @column()
  public address: string
  @column()
  public telp: string
  @column()
  activation: string
  @column()
  islogin: string
  @column.dateTime({ autoCreate: false, autoUpdate: true })
  last_login: DateTime
  @column()
  fortiget_assign: string
  @column({ serializeAs: null })
  public password: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // relationship

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>

  @belongsTo(() => Dept, {
    foreignKey: 'dept_id',
  })
  public dept: BelongsTo<typeof Dept>

  @hasMany(() => FormPermintaanAkses, {
    foreignKey: 'user_id',
  })
  public formPermintaan: HasMany<typeof FormPermintaanAkses>
  @hasMany(() => FormPermintaanAkses, {
    foreignKey: 'user_last_exec',
  })
  public user_lastUpdate_fpa: HasMany<typeof FormPermintaanAkses>
  @hasMany(() => AccessServerRequest, {
    foreignKey: 'user_last_exec',
  })
  public user_lastUpdate_asr: HasMany<typeof AccessServerRequest>
  @hasMany(() => AccessNasDirectoryRequest, {
    foreignKey: 'user_last_exec',
  })
  public user_lastUpdate_and: HasMany<typeof AccessNasDirectoryRequest>
}
