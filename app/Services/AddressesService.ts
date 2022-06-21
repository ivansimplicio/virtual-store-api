import NumberOfAddresses from 'App/Exceptions/NumberOfAddressesException'
import Address from 'App/Models/Address'

type AddressInsert = {
  street: string
  number?: string
  district?: string
  zipCode: string
  cityId: number
}

type AddressUpdate = {
  street?: string
  number?: string
  district?: string
  zipCode?: string
  cityId?: number
}

class AddressesService {
  private MINIMUM_NUMBER_OF_ADDRESSES = 1
  private MAXIMUM_NUMBER_OF_ADDRESSES = 3

  public async findAll(userId: number): Promise<Address[]> {
    const addresses = await Address.query().where('userId', userId)
    for (let address of addresses) {
      await this.loadAddressesRelationships(address)
    }
    return addresses
  }

  public async find(userId: number, addressId: number): Promise<Address | null> {
    const address = await Address.query().where('userId', userId).andWhere('id', addressId).first()
    if (address) {
      await this.loadAddressesRelationships(address)
    }
    return address
  }

  public async insert(userId: number, address: AddressInsert): Promise<Address | null> {
    const quantity = await this.numberOfRegisteredAddresses(userId)
    if (quantity < this.MAXIMUM_NUMBER_OF_ADDRESSES) {
      const createdAddress = await Address.create({ ...address, userId })
      await this.loadAddressesRelationships(createdAddress)
      return createdAddress
    }
    throw new NumberOfAddresses(
      `you can only have ${this.MAXIMUM_NUMBER_OF_ADDRESSES} registered addresses`
    )
  }

  public async update(
    userId: number,
    addressId: number,
    address: AddressUpdate
  ): Promise<Address | null> {
    const addressFound = await this.find(userId, addressId)
    if (addressFound) {
      await addressFound.merge(address).save()
      return this.find(userId, addressId)
    }
    return null
  }

  public async delete(userId: number, addressId: number): Promise<boolean> {
    const address = await this.find(userId, addressId)
    if (address) {
      const quantity = await this.numberOfRegisteredAddresses(userId)
      if (quantity > this.MINIMUM_NUMBER_OF_ADDRESSES) {
        await address.delete()
        return true
      }
      throw new NumberOfAddresses(
        `you must remain with at least ${this.MINIMUM_NUMBER_OF_ADDRESSES} registered address`
      )
    }
    return false
  }

  private async loadAddressesRelationships(address: Address): Promise<void> {
    await address.load('city', (query) => {
      query.preload('state')
    })
  }

  private async numberOfRegisteredAddresses(userId: number): Promise<number> {
    const addresses = await this.findAll(userId)
    return addresses.length
  }
}

export default new AddressesService()
