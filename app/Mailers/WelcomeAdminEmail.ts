import Env from '@ioc:Adonis/Core/Env'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class WelcomeAdminEmail extends BaseMailer {
  constructor(private name: string, private email: string) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject(`VS: Conta de administrador criada!`)
      .from(Env.get('SMTP_EMAIL_SENDER'))
      .to(this.email)
      .htmlView('emails/welcome_admin', { payload: { name: this.name } })
  }
}
