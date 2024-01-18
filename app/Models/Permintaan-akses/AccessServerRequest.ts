import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "../User";
import ServerPermission from "../Permissiion/ServerPermission";
import FormPermintaanAkses from "./FormPermintaanAkses";

export default class AccessServerRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;
  @column()
  public form_permintaan_akses_id: number;
  @column()
  public server_id: number;
  @column()
  public authorization_id: number;
  @column()
  public status: string;
  @column()
  public user_last_exec: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: "user_last_exec",
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('user_lastUpdate_asr')
      }
    }
  })
  public user_lastupdate: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public yang_mengajukan: BelongsTo<typeof User>;

  @belongsTo(() => FormPermintaanAkses, {
    foreignKey: "form_permintaan_akses_id",
  })
  public form_permintaan_akses: BelongsTo<typeof FormPermintaanAkses>;

  @belongsTo(() => User, {
    foreignKey: "authorization_id",
  })
  public yang_mengizinkan: BelongsTo<typeof User>;

  @belongsTo(() => ServerPermission, {
    foreignKey: "server_id",
  })
  public server_detail: BelongsTo<typeof ServerPermission>;
}
