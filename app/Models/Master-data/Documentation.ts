import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DocumentationListStep from './DocumentationListStep'
import DocumentationMap from './DocumentationMap'
import DocumentationChart from './DocumentationChart'
import DocumentationFlow from './DocumentationFlow'

export default class Documentation extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public desc: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => DocumentationListStep, {
    foreignKey: 'documentation_id',
  })
  public listep: HasMany<typeof DocumentationListStep>
  @hasMany(() => DocumentationMap, {
    foreignKey: 'documentation_id',
  })
  public map: HasMany<typeof DocumentationMap>
  @hasMany(() => DocumentationChart, {
    foreignKey: 'documentation_id',
  })
  public chart: HasMany<typeof DocumentationChart>
  @hasMany(() => DocumentationFlow, {
    foreignKey: 'documentation_id',
  })
  public flow: HasMany<typeof DocumentationFlow>
}
