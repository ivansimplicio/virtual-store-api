import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    const users = await User.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@email.com',
        password: 'password123',
        cpf: '14060305030',
        phoneNumber: '8877776666',
      },
      {
        id: 2,
        name: 'Ivan',
        email: 'ivan@email.com',
        password: 'password123',
        cpf: '31966993072',
        phoneNumber: '6677778888',
      },
      {
        id: 3,
        name: 'José',
        email: 'jose@email.com',
        password: 'password123',
        cpf: '74689091056',
        phoneNumber: '1122223333',
      },
    ])
    await users[0].related('roles').attach([1])
    await users[1].related('roles').attach([1, 2])
    await users[2].related('roles').attach([2])
  }
}
