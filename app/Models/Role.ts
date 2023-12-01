import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import RoleHasPermission from './RoleHasPermission'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company: string
  @column()
  public code: string
  @column()
  public rolename: string
  @column()
  public coderole: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'role_id',
  })
  public users: HasMany<typeof User>

  @manyToMany(() => RoleHasPermission, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: 'role_has_permissions',
  })
  public permission: ManyToMany<typeof RoleHasPermission>
  
}
