import User from 'App/Models/User'
import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import DeliveryAddress from './DeliveryAddress'
import OrderItem from './OrderItem'

export default class Order extends BaseModel {
  public static table = 'orders'

  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'address_id' })
  public addressId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => DeliveryAddress, {
    foreignKey: 'addressId',
  })
  public address: HasOne<typeof DeliveryAddress>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => OrderItem, {
    foreignKey: 'orderId',
  })
  public items: HasMany<typeof OrderItem>
}
