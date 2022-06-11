import User from 'App/Models/User'

type UserInsert = {
  name: string
  email: string
  password: string
  cpf: string
  phoneNumber: string
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
    return User.all()
  }

  public async find(userId: number): Promise<User | null> {
    const user = await User.find(userId)
    if (user) {
      await user.load('roles')
      return user
    }
    return null
  }

  public async insert(user: UserInsert): Promise<User> {
    const createdUser = await User.create(user)
    await createdUser.related('roles').attach([2])
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
}

export default new UsersService()
