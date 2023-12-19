import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class ServerPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public authorization_id: number;
  @column()
  public server: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: 'authorization_id',
  })
  public user: BelongsTo<typeof User>
}
