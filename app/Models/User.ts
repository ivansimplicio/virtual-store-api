import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Address from './Address'
import Order from './Order'
import LinkToken from './LinkToken'

type Builder = ModelQueryBuilderContract<typeof User>

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public cpf: string

  @column({ columnName: 'phone_number' })
  public phoneNumber: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'users_roles',
    pivotColumns: ['id'],
    pivotTimestamps: true,
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
  })
  public roles: ManyToMany<typeof Role>

  @hasMany(() => Address, {
    foreignKey: 'userId',
  })
  public addresses: HasMany<typeof Address>

  @hasMany(() => Order, {
    foreignKey: 'userId',
  })
  public orders: HasMany<typeof Order>

  @hasOne(() => LinkToken, {
    foreignKey: 'userId',
  })
  public linkToken: HasOne<typeof LinkToken>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static findByLikeName = scope((query: Builder, name: string) => {
    query.where('name', 'LIKE', `%${name}%`)
  })
}
