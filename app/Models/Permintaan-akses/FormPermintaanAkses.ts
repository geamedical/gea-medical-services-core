import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'

export default class FormPermintaanAkses extends BaseModel {
  public static table = 'form_permintaan_akses'
  @column({ isPrimary: true })
  public id: number
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}
