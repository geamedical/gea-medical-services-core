import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_notif_target').nullable()
      table.enum('type', ['login','logout','form-permintaan','lainya']).defaultTo('lainya')
      table.text('data_encode', 'longtext').nullable()
      table.enum('view', ['y', 'n']).defaultTo('n')
      table.string('icon')
      table.string('color')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
