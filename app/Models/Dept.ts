import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Dept extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company: string
  @column()
  public code: string
  @column()
  public deptname: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    localKey: 'id',
    foreignKey: 'dept_id',
  })
  public users: HasMany<typeof User>
}
