import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import DocumentationChart from './DocumentationChart'

export default class DocumentationFlow extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public documentation_id: number
  @column()
  public source: string
  @column()
  public destination: string
  @column()
  public type: string
  @column()
  public style: string
  @column()
  public markerd: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  // relationship
  @belongsTo(() => DocumentationChart, {
    foreignKey: 'id',
    localKey: 'documentation_id'
  })
  public chartflow: BelongsTo<typeof DocumentationChart>
}
