import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FormPermintaanAkses from './FormPermintaanAkses'

export default class GroupFormPermintaanAkses extends BaseModel {
  public static table = 'group_form_permintaan_akses'
  @column({ isPrimary: true })
  public id: number
  @column()
  public status_finish: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => FormPermintaanAkses, {
    foreignKey: 'group_form_permintaan_akses_id',
    localKey: 'id',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('user')
          .preload('accept_primary')
          .preload('accept_secondary')
          .preload('akses_server')
          .preload('akses_server_nas_folder')
          .preload('user_lastupdate')
      }
    }
  })
  public child_permintaan: HasMany<typeof FormPermintaanAkses>
}
