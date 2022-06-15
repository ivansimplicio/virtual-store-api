import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'delivery_addresses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
    })
  }
}
