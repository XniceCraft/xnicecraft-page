import { upsertCategoryValidator } from '#validators/category'
import Category from '#models/category'
import CategoryTransformer from '#transformers/category_transformer'

import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const categories = await Category.query()
      .withCount('posts')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return inertia.render('admin/categories/index', {
      categories: CategoryTransformer.paginate(categories.all(), categories.getMeta()).useVariant(
        'withPostsCount'
      ),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/categories/create', {})
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(upsertCategoryValidator)
    await Category.create(payload)

    return response.redirect().toRoute('admin.categories.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const category = await Category.findByOrFail('slug', params.slug)

    return inertia.render('admin/categories/edit', {
      category: CategoryTransformer.transform(category),
    })
  }

  async update({ request, response, params }: HttpContext) {
    const category = await Category.findByOrFail('slug', params.slug)
    const payload = await request.validateUsing(upsertCategoryValidator)

    await category.merge(payload).save()

    return response.redirect().toRoute('admin.categories.index')
  }

  async destroy({ params, response }: HttpContext) {
    const category = await Category.findByOrFail('slug', params.slug)
    await category.delete()

    return response.redirect().toRoute('admin.categories.index')
  }
}
