import { CategorySchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { hasMany } from '@adonisjs/lucid/orm'
import { slugify } from '@adonisjs/lucid-slugify'
import Post from '#models/post'

import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends CategorySchema {
  @column()
  @slugify({
    fields: ['name'],
  })
  declare slug: string

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>
}
