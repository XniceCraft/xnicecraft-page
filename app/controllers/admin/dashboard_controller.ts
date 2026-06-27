import Category from '#models/category'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const [categoriesCount, postsCount, publishedPostsCount, draftPostsCount, archivedPostsCount] =
      await Promise.all([
        Category.query().count('* as total').firstOrFail(),
        Post.query().count('* as total').firstOrFail(),
        Post.query().where('status', 'published').count('* as total').firstOrFail(),
        Post.query().where('status', 'draft').count('* as total').firstOrFail(),
        Post.query().where('status', 'archived').count('* as total').firstOrFail(),
      ])

    return inertia.render('admin/dashboard/index', {
      stats: {
        website: {
          totalPosts: Number(postsCount.$extras.total),
          publishedPosts: Number(publishedPostsCount.$extras.total),
        },
        categories: {
          total: Number(categoriesCount.$extras.total),
        },
        posts: {
          total: Number(postsCount.$extras.total),
          published: Number(publishedPostsCount.$extras.total),
          draft: Number(draftPostsCount.$extras.total),
          archived: Number(archivedPostsCount.$extras.total),
        },
      },
    })
  }
}
