import User from 'App/Models/User'

type AdminInsert = {
  name: string
  email: string
  password: string
  cpf: string
  phoneNumber: string
}

class AdminsService {
  public async insert(admin: AdminInsert): Promise<User> {
    const createdAdmin = await User.create(admin)
    await createdAdmin.related('roles').attach([1])
    await createdAdmin.load('roles')
    return createdAdmin
  }
}

export default new AdminsService()
