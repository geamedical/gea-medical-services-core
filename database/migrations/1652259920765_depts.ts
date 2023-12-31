import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Depts extends BaseSchema {
  protected tableName = 'depts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('company', 10).notNullable()
      table.string('code', 100).notNullable()
      table.string('deptname', 100).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
