import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class DeliveryAddress extends BaseModel {
  public static table = 'delivery_addresses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public district: string

  @column({ columnName: 'zip_code' })
  public zipCode: string

  @column()
  public city: string

  @column()
  public state: string

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
