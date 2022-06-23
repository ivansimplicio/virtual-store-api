import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.double('amount').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.integer('address_id').unsigned().references('id').inTable('delivery_addresses')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
