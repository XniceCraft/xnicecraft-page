import Category from '#models/category'
import Post from '#models/post'
import CategoryTransformer from '#transformers/category_transformer'
import PostTransformer from '#transformers/post_transformer'

import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .preload('category')
      .paginate(page, limit)

    const categories = await Category.all()

    return inertia.render('posts/index', {
      posts: PostTransformer.paginate(posts.all(), posts.getMeta()).useVariant('withDetail'),
      categories: CategoryTransformer.transform(categories),
    })
  }

  async show({ inertia, params }: HttpContext) {
    const post = await Post.findByOrFail('slug', params.slug)
    await post.load('category')

    return inertia.render('posts/show', {
      post: PostTransformer.transform(post).useVariant('withDetail'),
    })
  }
}
