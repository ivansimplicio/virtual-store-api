import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
