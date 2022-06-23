import DeliveryAddress from 'App/Models/DeliveryAddress'
import { DateTime } from 'luxon'
import Order from 'App/Models/Order'
import Env from '@ioc:Adonis/Core/Env'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class NewOrderEmail extends BaseMailer {
  constructor(private order: Order) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject('VS: Novo pedido realizado!')
      .from(Env.get('SMTP_EMAIL_SENDER'))
      .to(this.order.user.email)
      .htmlView('emails/new_order', { payload: this.preparePayload() })
  }

  private preparePayload() {
    return {
      user: {
        name: this.order.user.name,
      },
      order: {
        id: this.order.id,
        date: this.formatDate(this.order.createdAt),
        amount: this.formatValue(this.order.amount),
        items: this.order.items,
        address: this.formatAddress(this.order.address),
      },
    }
  }

  private formatDate(date: DateTime): string {
    return date.setLocale('pt-br').toLocaleString({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
  }

  private formatValue(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  private formatAddress(address: DeliveryAddress): string {
    let content = ''
      .concat(address.number ? `, ${address.number}` : '')
      .concat(address.district ? `, ${address.district}` : '')
    return `${address.street}${content} - ${address.zipCode} - ${address.city}/${address.state}`
  }
}
