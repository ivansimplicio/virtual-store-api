import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'delivery_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('street', 100).notNullable()
      table.string('number', 10)
      table.string('district', 30)
      table.string('zip_code', 20).notNullable()
      table.string('city', 40).notNullable()
      table.string('state', 25).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
