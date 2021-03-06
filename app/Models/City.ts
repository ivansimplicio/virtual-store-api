import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import State from './State'
import Address from './Address'

export default class City extends BaseModel {
  public static table = 'cities'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ columnName: 'state_id' })
  public stateId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => State, {
    foreignKey: 'stateId',
  })
  public state: BelongsTo<typeof State>

  @hasMany(() => Address, {
    foreignKey: 'cityId',
  })
  public addresses: HasMany<typeof Address>
}
