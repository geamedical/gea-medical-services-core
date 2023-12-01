import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('role_id').unsigned()
      table.integer('dept_id').unsigned()
      table.string('name', 255).notNullable()
      table.string('nik', 20).unique().notNullable()
      table.string('email').nullable()
      table.string('pin', 5).notNullable()
      table.string('username').unique().notNullable()
      table.date('birthdate').notNullable()
      table.enum('gender', ['Male', 'Female', 'Other']).defaultTo('Other').notNullable()
      table.enum('marital', ['Married', 'Unmarried', 'Other']).defaultTo('Other').notNullable()
      table.string('npwp').nullable()
      table.string('noktp').nullable()
      table.string('address').nullable()
      table.string('password', 180).notNullable()
      table.string('telp', 20).notNullable()
      table.enum('activation', ['valid', 'invalid']).defaultTo('invalid').notNullable()
      table.enum('islogin', ['y', 'n']).defaultTo('n').notNullable()
      table.timestamp('last_login', { useTz: true }).nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
