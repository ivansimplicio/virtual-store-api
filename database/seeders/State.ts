import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class StateSeeder extends BaseSeeder {
  public async run() {
    await Database.insertQuery()
      .table('states')
      .insert([
        { id: 1, name: 'Acre', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'Alagoas', created_at: new Date(), updated_at: new Date() },
        { id: 3, name: 'Amazonas', created_at: new Date(), updated_at: new Date() },
        { id: 4, name: 'Amapá', created_at: new Date(), updated_at: new Date() },
        { id: 5, name: 'Bahia', created_at: new Date(), updated_at: new Date() },
        { id: 6, name: 'Ceará', created_at: new Date(), updated_at: new Date() },
        { id: 7, name: 'Distrito Federal', created_at: new Date(), updated_at: new Date() },
        { id: 8, name: 'Espírito Santo', created_at: new Date(), updated_at: new Date() },
        { id: 9, name: 'Goiás', created_at: new Date(), updated_at: new Date() },
        { id: 10, name: 'Maranhão', created_at: new Date(), updated_at: new Date() },
        { id: 11, name: 'Minas Gerais', created_at: new Date(), updated_at: new Date() },
        { id: 12, name: 'Mato Grosso do Sul', created_at: new Date(), updated_at: new Date() },
        { id: 13, name: 'Mato Grosso', created_at: new Date(), updated_at: new Date() },
        { id: 14, name: 'Pará', created_at: new Date(), updated_at: new Date() },
        { id: 15, name: 'Paraíba', created_at: new Date(), updated_at: new Date() },
        { id: 16, name: 'Pernambuco', created_at: new Date(), updated_at: new Date() },
        { id: 17, name: 'Piauí', created_at: new Date(), updated_at: new Date() },
        { id: 18, name: 'Paraná', created_at: new Date(), updated_at: new Date() },
        { id: 19, name: 'Rio de Janeiro', created_at: new Date(), updated_at: new Date() },
        { id: 20, name: 'Rio Grande do Norte', created_at: new Date(), updated_at: new Date() },
        { id: 21, name: 'Rondônia', created_at: new Date(), updated_at: new Date() },
        { id: 22, name: 'Roraima', created_at: new Date(), updated_at: new Date() },
        { id: 23, name: 'Rio Grande do Sul', created_at: new Date(), updated_at: new Date() },
        { id: 24, name: 'Santa Catarina', created_at: new Date(), updated_at: new Date() },
        { id: 25, name: 'Sergipe', created_at: new Date(), updated_at: new Date() },
        { id: 26, name: 'São Paulo', created_at: new Date(), updated_at: new Date() },
        { id: 27, name: 'Tocantins', created_at: new Date(), updated_at: new Date() },
      ])
  }
}
