import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "../User";

export default class NasDirPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public primary_authorization_id: number;
  @column()
  public secondary_authorization_id: number;
  @column()
  public dirname: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: "primary_authorization_id",
  })
  public user_primary: BelongsTo<typeof User>;
  @belongsTo(() => User, {
    foreignKey: "secondary_authorization_id",
  })
  public user_secondary: BelongsTo<typeof User>;
}
