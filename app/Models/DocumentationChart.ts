import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Documentation from './Documentation'
import DocumentationFlow from './DocumentationFlow'

export default class DocumentationChart extends BaseModel {
  @column()
  public id: string
  @column()
  public documentation_id: number
  @column()
  public x: number
  @column()
  public y: number
  @column()
  public width: number
  @column()
  public height: number
  @column()
  public name: string
  @column()
  public type: string
  @column()
  public shape: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => Documentation, {
    foreignKey: 'documentation_id',
    localKey: 'id'
  })
  public documentation: BelongsTo<typeof Documentation>
  @hasMany(() => DocumentationFlow, {
    localKey: 'id',
    foreignKey: 'documentation_chart_id',
  })
  public flow: HasMany<typeof DocumentationFlow>
}
