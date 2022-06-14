import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Address extends BaseModel {
  public static table = 'adresses'

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

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'city_id' })
  public cityId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => City, {
    foreignKey: 'cityId',
  })
  public city: BelongsTo<typeof City>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>
}
