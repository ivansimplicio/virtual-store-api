import Env from '@ioc:Adonis/Core/Env'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class WelcomeClient extends BaseMailer {
  constructor(private name: string, private email: string) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject(`VS: Bem-vindo(a), ${this.name}`)
      .from(Env.get('SMTP_EMAIL_SENDER'))
      .to(this.email)
      .htmlView('emails/welcome_client', { payload: { name: this.name } })
  }
}
