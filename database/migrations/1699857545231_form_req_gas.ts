import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'form_permintaan_akses'

  public async up () {
    this.schema.createTable('group_form_permintaan_akses', (table) => {
      table.increments('id')
      table.enum('status_finish', ['y','n','w']).defaultTo('w')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('group_form_permintaan_akses_id').unsigned().references('id').inTable('group_form_permintaan_akses').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('type', ['email','akses-wifi','akses-server', 'lainya']).defaultTo('lainya')
      table.text('detail', 'longtext')
      table.text('notes', 'longtext').nullable()
      table.integer('accept_primary_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('accept_secondary_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('status_secondary', ['y','n','w']).defaultTo('w')
      table.enum('status_primary', ['y','n','w']).defaultTo('w')
      table.enum('status_feedback', ['y','n','w']).defaultTo('w')
      table.string('feedback_message').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
    this.schema.dropTable('group_form_permintaan_akses')
  }
}
