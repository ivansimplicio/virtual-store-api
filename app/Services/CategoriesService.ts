import Category from 'App/Models/Category'

type CategoryInsert = {
  name: string
  description: string
}

type CategoryUpdate = {
  name?: string
  description?: string
}

class CategoriesService {
  public async findAll(): Promise<Category[]> {
    return Category.all()
  }

  public async find(categoryId: number): Promise<Category | null> {
    const category = await Category.find(categoryId)
    if (category) {
      await category.load('products')
      return category
    }
    return null
  }

  public async insert(category: CategoryInsert): Promise<Category> {
    return Category.create(category)
  }

  public async update(categoryId: number, category: CategoryUpdate): Promise<Category | null> {
    const cat = await Category.find(categoryId)
    if (cat) {
      return cat.merge(category).save()
    }
    return null
  }

  public async delete(categoryId: number): Promise<boolean> {
    const category = await Category.find(categoryId)
    if (category) {
      await category.delete()
      return true
    }
    return false
  }
}

export default new CategoriesService()
