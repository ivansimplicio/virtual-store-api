import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DeliveryAddress from './DeliveryAddress'

export default class Order extends BaseModel {
  public static table = 'orders'

  @column({ isPrimary: true })
  public id: number

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
}
