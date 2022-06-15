import Product from 'App/Models/Product'

type ProductInsert = {
  name: string
  price: number
  categories: number[]
}

type ProductUpdate = {
  name?: string
  price?: number
  categories?: number[]
}

class ProductsService {
  public async findAll(): Promise<Product[]> {
    return Product.all()
  }

  public async find(productId: number): Promise<Product | null> {
    const product = await Product.find(productId)
    if (product) {
      await this.loadProductRelationships(product)
      return product
    }
    return null
  }

  public async insert(product: ProductInsert): Promise<Product> {
    const createdProduct = await Product.create(product)
    await createdProduct.related('categories').attach(product.categories)
    await this.loadProductRelationships(createdProduct)
    return createdProduct
  }

  public async update(productId: number, product: ProductUpdate): Promise<Product | null> {
    const prod = await Product.find(productId)
    if (prod) {
      const updatedProduct = await prod.merge(product).save()
      if (product.categories) {
        await updatedProduct.related('categories').detach()
        await updatedProduct.related('categories').attach(product.categories)
      }
      await this.loadProductRelationships(updatedProduct)
      return updatedProduct
    }
    return null
  }

  public async delete(productId: number): Promise<boolean> {
    const product = await Product.find(productId)
    if (product) {
      await product.delete()
      return true
    }
    return false
  }

  private async loadProductRelationships(product: Product): Promise<void> {
    await product.load('categories')
  }
}

export default new ProductsService()
