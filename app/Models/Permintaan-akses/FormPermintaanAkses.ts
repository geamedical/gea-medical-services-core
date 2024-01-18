import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import AccessServerRequest from './AccessServerRequest'
import GroupFormPermintaanAkses from './GroupFormPermintaanAkses'
import AccessNasDirectoryRequest from './AccessNasDirectoryRequest'

export default class FormPermintaanAkses extends BaseModel {
  public static table = 'form_permintaan_akses'
  @column({ isPrimary: true })
  public id: number
  @column()
  public group_form_permintaan_akses_id: number
  @column()
  public user_id: number
  @column()
  public type: string
  @column()
  public detail: string
  @column()
  public notes: string
  @column()
  public accept_primary_id: number
  @column()
  public accept_secondary_id: number
  @column()
  public status_secondary: string
  @column()
  public status_primary: string
  @column()
  public status_feedback: string
  @column()
  public feedback_message: string
  @column()
  public user_last_exec: number

  @belongsTo(() => GroupFormPermintaanAkses, {
    foreignKey: 'id',
    localKey:'group_form_permintaan_akses_id'
  })
  public parents: BelongsTo<typeof GroupFormPermintaanAkses>

  @belongsTo(() => User, {
    foreignKey: "user_last_exec",
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('user_lastUpdate_fpa')
      }
    }
  })
  public user_lastupdate: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'accept_primary_id',
  })
  public accept_primary: BelongsTo<typeof User>
  @belongsTo(() => User, {
    foreignKey: 'accept_secondary_id',
  })
  public accept_secondary: BelongsTo<typeof User>

  @hasMany(() => AccessServerRequest, {
    foreignKey: 'form_permintaan_akses_id',
    localKey: 'id',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('server_detail')
      }
    }
  })
  public akses_server: HasMany<typeof AccessServerRequest>
  @hasMany(() => AccessNasDirectoryRequest, {
    foreignKey: 'form_permintaan_akses_id',
    localKey: 'id',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('nas_detail')
      }
    }
  })
  public akses_server_nas_folder: HasMany<typeof AccessNasDirectoryRequest>
}
