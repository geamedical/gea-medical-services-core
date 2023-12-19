import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'server_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('authorization_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('server')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.schema.createTable('access_server_requests', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('server_id').unsigned().references('id').inTable('server_permissions').onDelete('CASCADE')
      table.integer('authorization_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('status', ['y','n','w']).defaultTo('w')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable('access_server_requests')
    this.schema.dropTable(this.tableName)
  }
}
