import Category from '#models/category'
import Post from '#models/post'
import CategoryTransformer from '#transformers/category_transformer'
import PostTransformer from '#transformers/post_transformer'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { createPostValidator, updatePostValidator } from '#validators/post'

import type { HttpContext } from '@adonisjs/core/http'
import type { JSONContent } from '@tiptap/react'
import { calculateReadTimeMinutes } from '#helpers/post'

export default class PostsController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .preload('category')
      .paginate(page, limit)

    return inertia.render('admin/posts/index', {
      posts: PostTransformer.paginate(posts.all(), posts.getMeta()).useVariant('withDetail'),
    })
  }

  async create({ inertia }: HttpContext) {
    const categories = await Category.all()

    return inertia.render('admin/posts/create', {
      categories: CategoryTransformer.transform(categories),
    })
  }

  async store({ request, response }: HttpContext) {
    const { coverImage, content, ...payload } = await request.validateUsing(createPostValidator)
    const cover = await attachmentManager.createFromFile(coverImage.file)

    const readTime = calculateReadTimeMinutes(content)

    await Post.create({
      ...payload,
      content: content as unknown as JSONContent,
      coverImage: cover,
      readTime: readTime,
    })

    return response.redirect().toRoute('admin.posts.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const post = await Post.findByOrFail('slug', params.slug)
    const categories = await Category.all()

    return inertia.render('admin/posts/edit', {
      post: PostTransformer.transform(post).useVariant('withDetail'),
      categories: CategoryTransformer.transform(categories),
    })
  }

  async update({ response, request, params }: HttpContext) {
    const { coverImage, content, ...payload } = await request.validateUsing(updatePostValidator)
    const post = await Post.findByOrFail('slug', params.slug)

    let cover = post.coverImage
    if (coverImage.type === 'replace') {
      await post.coverImage.remove()
      cover = await attachmentManager.createFromFile(coverImage.file)
    }

    const readTime = calculateReadTimeMinutes(content)

    await post
      .merge({
        ...payload,
        content: content as unknown as JSONContent,
        coverImage: cover,
        readTime: readTime,
      })
      .save()

    return response.redirect().toRoute('admin.posts.edit', { slug: post.slug })
  }

  async destroy({ response, params }: HttpContext) {
    const post = await Post.findByOrFail('slug', params.slug)

    await post.coverImage.remove()
    await post.delete()

    return response.redirect().toRoute('admin.posts.index')
  }
}
