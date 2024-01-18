import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'access_nas_directory_requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_permintaan_akses_id').unsigned().references('id').inTable('form_permintaan_akses').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('nas_dir_permission_id').unsigned().references('id').inTable('nas_dir_permissions').onDelete('CASCADE')
      table.integer('authorization_primary_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('authorization_primary_axec', ['approved', 'rejected', 'gift', 'waiting']).defaultTo('waiting')
      table.integer('authorization_secondary_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('authorization_secondary_axec', ['approved', 'rejected', 'waiting']).defaultTo('waiting')
      table.enum('read', ['y', 'n']).defaultTo('n')
      table.enum('write', ['y', 'n']).defaultTo('n')
      table.enum('status', ['y', 'n', 'w']).defaultTo('w')
      table.integer('user_last_exec').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable()
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
