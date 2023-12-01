import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import RoleHasPermission from './RoleHasPermission'
import GroupPermission from './GroupPermission'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public group_permission_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => GroupPermission, {
    foreignKey: 'group_permission_id',
    localKey: 'id'
  })
  public parent: BelongsTo<typeof GroupPermission>

  @manyToMany(() => RoleHasPermission, {
    pivotTable: 'role_has_permissions',
  })
  public permissions: ManyToMany<typeof RoleHasPermission>

}
