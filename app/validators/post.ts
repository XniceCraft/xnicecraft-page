import vine from '@vinejs/vine'
import { imageCreateFieldValidator, imageUpdateFieldValidator } from '#validators/image'

const title = () => vine.string().maxLength(255).minLength(1)
const content = () => vine.any()
const excerpt = () => vine.string().maxLength(255)
const status = () => vine.enum(['draft', 'published', 'archived'])
const categoryId = () => vine.number().exists({ table: 'categories', column: 'id' }).optional()
const publishedAt = () => vine.date({ formats: ['YYYY-MM-DDTHH:mm'] })

export const createPostValidator = vine.create({
  coverImage: imageCreateFieldValidator(),
  title: title(),
  content: content(),
  excerpt: excerpt(),
  status: status(),
  categoryId: categoryId(),
  publishedAt: publishedAt(),
})

export const updatePostValidator = vine.create({
  coverImage: imageUpdateFieldValidator(),
  title: title(),
  content: content(),
  excerpt: excerpt(),
  status: status(),
  categoryId: categoryId(),
  publishedAt: publishedAt(),
})
