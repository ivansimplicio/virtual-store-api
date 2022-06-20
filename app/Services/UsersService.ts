import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

type UserInsert = {
  name: string
  email: string
  password: string
  cpf: string
  phoneNumber: string
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
  password?: string
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
    await createdUser.related('roles').attach([2])
    await this.loadUserRelationships(createdUser)
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
    return user.roles.some((element) => element.role === role)
  }
}

export default new UsersService()
