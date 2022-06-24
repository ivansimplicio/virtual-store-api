import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import OrderItem from './OrderItem'

type Builder = ModelQueryBuilderContract<typeof Product>

export default class Product extends BaseModel {
  public static table = 'products'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'products_categories',
    pivotColumns: ['id'],
    pivotTimestamps: true,
    localKey: 'id',
    pivotForeignKey: 'product_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
  })
  public categories: ManyToMany<typeof Category>

  @hasMany(() => OrderItem, {
    foreignKey: 'productId',
  })
  public items: HasMany<typeof OrderItem>

  public static findByLikeName = scope((query: Builder, name: string) => {
    query.where('name', 'LIKE', `%${name}%`)
  })
}
