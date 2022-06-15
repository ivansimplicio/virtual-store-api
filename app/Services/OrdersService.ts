import Product from 'App/Models/Product'
import User from 'App/Models/User'
import Order from 'App/Models/Order'
import InvalidAddress from 'App/Exceptions/InvalidAddressException'
import Address from 'App/Models/Address'

type OrderItem = {
  productId: number
  quantity: number
  discount: number
  amount: number
}

type OrderItemInput = {
  productId: number
  quantity: number
  discount: number
}

type OrderInput = {
  addressId: number
  items: OrderItemInput[]
}

class OrdersService {
  public async findAll(): Promise<Order[]> {
    return Order.query().preload('user')
  }

  public async find(orderId: number): Promise<Order | null> {
    const order = await Order.find(orderId)
    if (!order) {
      return null
    }
    await order.load((orderLoader) => {
      orderLoader
        .load('user')
        .load('address')
        .load('items', (itemsLoader) => {
          itemsLoader.preload('product')
        })
    })
    return order
  }

  public async store(userId: number, orderInput: OrderInput): Promise<Order> {
    const user = await this.loadUserInformation(userId)
    const address = await this.findUserAddress(orderInput.addressId, user)
    const items = await this.getOrderItems(orderInput.items)
    const order = await Order.create({
      userId,
      amount: this.calculateOrderValue(items),
    })
    await order.related('address').create(this.getOrderDeliveryAddress(address))
    await order.related('items').createMany(items)
    await order.load((orderLoader) => {
      orderLoader
        .load('user')
        .load('address')
        .load('items', (itemsLoader) => {
          itemsLoader.preload('product')
        })
    })
    return order
  }

  private async loadUserInformation(userId: number): Promise<User> {
    const user = await User.findOrFail(userId)
    await user.load('addresses', (query) => {
      query.preload('city', (query) => {
        query.preload('state')
      })
    })
    return user
  }

  private async findUserAddress(addressId: number, user: User): Promise<Address> {
    const address = user.addresses.find((address) => address.id === addressId)
    if (!address) {
      throw new InvalidAddress()
    }
    return address
  }

  private calculateOrderValue(orderItems: OrderItem[]): number {
    const amount = orderItems.reduce((initial, current) => initial + current.amount, 0)
    return parseFloat(amount.toFixed(2))
  }

  private getOrderDeliveryAddress(address: Address) {
    return {
      street: address.street,
      number: address.number,
      district: address.district,
      zipCode: address.zipCode,
      city: address.city.name,
      state: address.city.state.name,
    }
  }

  private async getOrderItems(items: OrderItemInput[]): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = []
    for (let item of items) {
      const product = await Product.findOrFail(item.productId)
      const quantity = item.quantity
      const discount = item.discount
      const amount = product.price * (1 - discount) * quantity
      orderItems.push({ quantity, discount, amount, productId: item.productId })
    }
    return orderItems
  }
}

export default new OrdersService()
