import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import NasDirPermission from '../Permissiion/NasDirPermission'
import FormPermintaanAkses from './FormPermintaanAkses'

export default class AccessNasDirectoryRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public form_permintaan_akses_id: number
  @column()
  public user_id: number
  @column()
  public nas_dir_permission_id: number
  @column()
  public authorization_primary_id: number
  @column()
  public authorization_primary_axec: string
  @column()
  public authorization_secondary_id: number
  @column()
  public authorization_secondary_axec: string
  @column()
  public status: string
  @column()
  public read: string
  @column()
  public write: string
  @column()
  public user_last_exec: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: "user_last_exec",
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('user_lastUpdate_and')
      }
    }
  })
  public user_lastupdate: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public yang_mengajukan: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "authorization_primary_id",
  })
  public yang_mengizinkan_utama: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "authorization_secondary_id",
  })
  public yang_mengizinkan_pengganti: BelongsTo<typeof User>;

  @belongsTo(() => NasDirPermission, {
    foreignKey: "nas_dir_permission_id",
  })
  public nas_detail: BelongsTo<typeof NasDirPermission>;
  @belongsTo(() => FormPermintaanAkses, {
    foreignKey: "form_permintaan_akses_id",
  })
  public form_permintaan_akses: BelongsTo<typeof FormPermintaanAkses>;
}
