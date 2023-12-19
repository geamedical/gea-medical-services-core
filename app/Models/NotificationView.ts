import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class NotificationView extends BaseModel {
  public static table = 'notification'
  @column()
  public identify_id: number
  @column()
  public tablename: string
  @column()
  public from: number
  @column()
  public to: number
  @column()
  public status: string
  

  @belongsTo(() => User, {
    foreignKey: 'from',
  })
  public from_user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'to',
  })
  public to_user: BelongsTo<typeof User>
}
