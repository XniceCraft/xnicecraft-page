import vine from '@vinejs/vine'

export const upsertCategoryValidator = vine.create({
  name: vine.string().maxLength(255),
})

export const showCategoryValidator = vine.create({
  slug: vine.string().exists({ table: 'categories', column: 'slug' }),
})
