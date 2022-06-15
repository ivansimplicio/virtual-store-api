import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Order from 'App/Models/Order'

export default class OrderSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    const orders = await Order.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        amount: 7998,
        userId: 2,
      },
      {
        id: 2,
        amount: 1495.24,
        userId: 3,
      },
    ])
    await orders[0].related('items').createMany([
      {
        id: 1,
        quantity: 2,
        discount: 0,
        amount: 7998,
        productId: 1,
      },
    ])
    await orders[1].related('items').createMany([
      {
        id: 2,
        quantity: 1,
        discount: 0,
        amount: 89.91,
        productId: 3,
      },
      {
        id: 3,
        quantity: 1,
        discount: 0,
        amount: 1015.43,
        productId: 4,
      },
      {
        id: 4,
        quantity: 1,
        discount: 0,
        amount: 389.9,
        productId: 5,
      },
    ])
  }
}
