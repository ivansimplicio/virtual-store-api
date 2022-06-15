import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DeliveryAddress from 'App/Models/DeliveryAddress'

export default class DeliveryAddressSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    await DeliveryAddress.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        street: 'Rua Gama Rosa',
        number: '123',
        district: 'Centro',
        zipCode: '58396000',
        city: 'Arara',
        state: 'Paraíba',
        orderId: 1,
      },
      {
        id: 2,
        street: 'Rua Quarenta e Sete',
        number: '685',
        district: 'Jardim São Paulo',
        zipCode: '08465312',
        city: 'São Paulo',
        state: 'São Paulo',
        orderId: 2,
      },
    ])
  }
}
