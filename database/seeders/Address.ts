import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'
    await Address.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        street: 'Rua Juscelino Kubitschek',
        number: '1256',
        district: 'Bairro Industrial',
        zipCode: '53689102',
        cityId: 2655,
        userId: 1,
      },
      {
        id: 2,
        street: 'Rua Gama Rosa',
        number: '123',
        district: 'Centro',
        zipCode: '58396000',
        cityId: 2572,
        userId: 2,
      },
      {
        id: 3,
        street: 'Rua Quarenta e Sete',
        number: '685',
        district: 'Jardim São Paulo',
        zipCode: '08465312',
        cityId: 5270,
        userId: 3,
      },
    ])
  }
}
