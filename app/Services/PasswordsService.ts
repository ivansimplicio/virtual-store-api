import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import { promisify } from 'util'
import { randomBytes } from 'crypto'
import EmailNotFound from 'App/Exceptions/EmailNotFoundException'
import ForgotPasswordEmail from 'App/Mailers/ForgotPasswordEmail'
import ChangePasswordEmail from 'App/Mailers/ChangePasswordEmail'
import ExpiredToken from 'App/Exceptions/ExpiredTokenException'
import InvalidToken from 'App/Exceptions/InvalidTokenException'
import InvalidPassword from 'App/Exceptions/InvalidPasswordException'

class PasswordsService {
  public async forgot(email: string, completeUrl: string, url: string): Promise<void> {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new EmailNotFound('the email provided is not registered in the system')
    }
    const token = await this.generateToken()
    await user.related('linkToken').updateOrCreate({ userId: user.id }, { token })
    const urlWithToken = this.generateUrlWithToken(completeUrl, url, token)
    await new ForgotPasswordEmail(user.name, user.email, urlWithToken).sendLater()
  }

  public async reset(token: string, password: string): Promise<void> {
    const TOKEN_EXPIRY_HOURS = 4
    const user = await this.findUserByToken(token)
    if (!user) {
      throw new InvalidToken()
    }
    const tokenAge = Math.abs(user.linkToken.updatedAt.diffNow('hours').hours)
    if (tokenAge > TOKEN_EXPIRY_HOURS) {
      throw new ExpiredToken()
    }
    await user.merge({ password }).save()
    await user.linkToken.delete()
    await new ChangePasswordEmail(user.name, user.email).sendLater()
  }

  public async change(userId: number, currentPassword: string, newPassword: string) {
    const user = await User.findOrFail(userId)
    const passwordsMatch = await Hash.verify(user.password, currentPassword)
    if (!passwordsMatch) {
      throw new InvalidPassword()
    }
    await user.merge({ password: newPassword }).save()
    await new ChangePasswordEmail(user.name, user.email).sendLater()
  }

  private async generateToken(): Promise<string> {
    const random = await promisify(randomBytes)(24)
    return random.toString('hex')
  }

  private generateUrlWithToken(completeUrl: string, url: string, token: string): string {
    const urlReplaced = completeUrl.replace(url, '/reset-password')
    return `${urlReplaced}?token=${token}`
  }

  private async findUserByToken(token: string): Promise<User | null> {
    return User.query()
      .whereHas('linkToken', (query) => {
        query.where('token', token)
      })
      .preload('linkToken')
      .first()
  }
}

export default new PasswordsService()
