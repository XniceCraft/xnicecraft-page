import { BaseTransformer } from '@adonisjs/core/transformers'
import CategoryTransformer from '#transformers/category_transformer'

import type Post from '#models/post'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'slug', 'excerpt', 'readTime']),
      publishedAt: this.resource.publishedAt?.toFormat("yyyy-MM-dd'T'HH:mm"),
      category: CategoryTransformer.transform(this.whenLoaded(this.resource.category)),
    }
  }

  async withDetail() {
    return {
      ...this.toObject(),
      ...this.pick(this.resource, ['content', 'createdAt', 'status', 'categoryId']),
      coverImage: await this.resource.coverImage.getVariant('medium')!.getUrl(),
    }
  }
}
