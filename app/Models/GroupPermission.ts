import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'

export default class GroupPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => Permission, {
    localKey:'id',
    foreignKey: 'group_permission_id',
  })
  public child: HasMany<typeof Permission>
}
