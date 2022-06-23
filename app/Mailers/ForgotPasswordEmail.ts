import Env from '@ioc:Adonis/Core/Env'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordEmail extends BaseMailer {
  constructor(private name: string, private email: string, private url: string) {
    super()
  }

  public prepare(message: MessageContract) {
    const payload = {
      name: this.name,
      url: this.url,
    }
    message
      .subject('VS: Recuperação de senha')
      .from(Env.get('SMTP_EMAIL_SENDER'))
      .to(this.email)
      .htmlView('emails/forgot_password', { payload })
  }
}
