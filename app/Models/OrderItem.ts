import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class OrderItem extends BaseModel {
  public static table = 'order_items'

  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public discount: number

  @column()
  public amount: number

  @column({ columnName: 'product_id' })
  public productId: number

  @column({ columnName: 'order_id' })
  public orderId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  public order: BelongsTo<typeof Order>
}
