import { PostSchema } from '#database/schema'
import { attachment } from '@jrmc/adonis-attachment'
import { column } from '@adonisjs/lucid/orm'
import { hasOne } from '@adonisjs/lucid/orm'
import { slugify } from '@adonisjs/lucid-slugify'
import Category from '#models/category'

import type { JSONContent } from '@tiptap/react'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Post extends PostSchema {
  @column()
  @slugify({
    fields: ['title'],
  })
  declare slug: string

  @column()
  declare content: JSONContent

  @attachment({ folder: 'uploads/images/cover', variants: ['small', 'medium'] })
  declare coverImage: Attachment

  @column()
  declare status: 'draft' | 'published' | 'archived'

  @hasOne(() => Category)
  declare category: HasOne<typeof Category>
}
