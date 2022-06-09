import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    await Category.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Eletrônicos',
        description: 'Tudo em eletrônicos para você!',
      },
      {
        id: 2,
        name: 'Games',
        description: 'Tudo em games para você!',
      },
      {
        id: 3,
        name: 'Ferramentas',
        description: 'Tudo em ferramentas para você!',
      },
    ])
  }
}
