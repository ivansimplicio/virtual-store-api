import Roles from 'App/Enums/Roles'
import WelcomeAdmin from 'App/Mailers/WelcomeAdmin'
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
    await createdAdmin.related('roles').attach([Roles.ADMIN])
    await createdAdmin.load('roles')
    await new WelcomeAdmin(createdAdmin.name, createdAdmin.email).sendLater()
    return createdAdmin
  }
}

export default new AdminsService()
