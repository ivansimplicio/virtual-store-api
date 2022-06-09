import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    const products = await Product.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Smart TV Samsung 55" QLED 4K',
        price: 3999,
      },
      {
        id: 2,
        name: 'Horizon Forbidden West',
        price: 229.9,
      },
      {
        id: 3,
        name: 'Maleta de ferramentas kit com 129 peças',
        price: 89.91,
      },
      {
        id: 4,
        name: 'Nível a Laser Bosch',
        price: 1015.43,
      },
      {
        id: 5,
        name: 'Trena Laser Bosch',
        price: 389.9,
      },
    ])
    await products[0].related('categories').attach([1])
    await products[1].related('categories').attach([2])
    await products[2].related('categories').attach([3])
    await products[3].related('categories').attach([1, 3])
    await products[4].related('categories').attach([1, 3])
  }
}
