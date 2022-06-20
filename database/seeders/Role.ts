import Roles from 'App/Enums/Roles'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'role'
    await Role.updateOrCreateMany(uniqueKey, [
      {
        id: Roles.ADMIN,
        role: 'ADMIN',
      },
      {
        id: Roles.CLIENT,
        role: 'CLIENT',
      },
    ])
  }
}
