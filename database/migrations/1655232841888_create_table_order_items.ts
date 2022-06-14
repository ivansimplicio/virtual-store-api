import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('quantity').unsigned().notNullable()
      table.double('discount').unsigned().notNullable()
      table.double('amount').unsigned().notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
