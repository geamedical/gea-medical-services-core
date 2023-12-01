import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissions extends BaseSchema {
  public async up () {
    this.schema.createTable('group_permissions', (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.schema.createTable('permissions', (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.integer('group_permission_id').unsigned().references('id').inTable('group_permissions').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable('permissions')
    this.schema.dropTable('group_permissions')
  }
}
