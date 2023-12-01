import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Documentation from './Documentation'

export default class DocumentationMap extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public documentation_id: number
  @column()
  public step: number
  @column()
  public text: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  // relationship
  @belongsTo(() => Documentation, {
    foreignKey: 'id',
    localKey: 'documentation_id'
  })
  public documentation: BelongsTo<typeof Documentation>
}
