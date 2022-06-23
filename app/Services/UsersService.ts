import Roles from 'App/Enums/Roles'
import AccountDeletionEmail from 'App/Mailers/AccountDeletionEmail'
import WelcomeClientEmail from 'App/Mailers/WelcomeClientEmail'
import User from 'App/Models/User'

type UserInsert = {
  name: string
  email: string
  password: string
  cpf: string
  phoneNumber?: string
  address: {
    street: string
    number?: string
    district?: string
    zipCode: string
    cityId: number
  }
}

type UserUpdate = {
  name?: string
  email?: string
  cpf?: string
  phoneNumber?: string
}

class UsersService {
  public async findAll(): Promise<User[]> {
    return User.query().preload('roles')
  }

  public async find(userId: number): Promise<User | null> {
    const user = await User.find(userId)
    if (user) {
      await this.loadUserRelationships(user)
      await user.load('orders')
      return user
    }
    return null
  }

  public async insert(user: UserInsert): Promise<User> {
    const { address, ...userData } = user
    const createdUser = await User.create(userData)
    await createdUser.related('addresses').create(address)
    await createdUser.related('roles').attach([Roles.CLIENT])
    await this.loadUserRelationships(createdUser)
    await new WelcomeClientEmail(createdUser.name, createdUser.email).sendLater()
    return createdUser
  }

  public async update(userId: number, user: UserUpdate): Promise<User | null> {
    const userFound = await User.find(userId)
    if (userFound) {
      return userFound.merge(user).save()
    }
    return null
  }

  public async delete(userId: number): Promise<boolean> {
    const userFound = await User.find(userId)
    if (userFound) {
      await userFound.delete()
      await new AccountDeletionEmail(userFound.name, userFound.email).sendLater()
      return true
    }
    return false
  }

  private async loadUserRelationships(user: User): Promise<void> {
    await user.load((userLoader) => {
      userLoader.load('roles').load('addresses', (query) => {
        query.preload('city', (query) => {
          query.preload('state')
        })
      })
    })
  }

  public async userHasRole(user: User, role: Roles): Promise<boolean> {
    await user.load('roles')
    return user.roles.some((element) => element.id === role)
  }
}

export default new UsersService()
