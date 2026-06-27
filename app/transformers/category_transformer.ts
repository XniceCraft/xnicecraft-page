import { BaseTransformer } from '@adonisjs/core/transformers'

import type Category from '#models/category'

export default class CategoryTransformer extends BaseTransformer<Category> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'slug', 'createdAt'])
  }

  withPostsCount() {
    return {
      ...this.toObject(),
      postsCount: this.withCount('posts'),
    }
  }
}
