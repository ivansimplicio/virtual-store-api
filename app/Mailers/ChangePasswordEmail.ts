import Env from '@ioc:Adonis/Core/Env'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ChangePasswordEmail extends BaseMailer {
  constructor(private name: string, private email: string) {
    super()
  }

  public prepare(message: MessageContract) {
    const payload = {
      name: this.name,
      email: this.email,
      date: this.getCurrentDate(),
    }
    message
      .subject('VS: Alteração de senha')
      .from(Env.get('SMTP_EMAIL_SENDER'))
      .to(this.email)
      .htmlView('emails/change_password', { payload })
  }

  private getCurrentDate(): string {
    const date = new Date()
    return date.toLocaleDateString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
}
