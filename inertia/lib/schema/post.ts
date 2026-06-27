import { z } from 'zod/mini'
import { imageField, imageFieldCreate } from './image'

import type { JSONContent } from '@tiptap/react'

const baseSchema = z.object({
  title: z.string().check(z.maxLength(255, 'Maximum length is 255 characters')),
  content: z.custom<JSONContent>(),
  excerpt: z.string().check(z.maxLength(255, 'Maximum length is 255 characters')),
  status: z.enum(['draft', 'published', 'archived'] as const),
  categoryId: z.optional(z.int().check(z.gte(1, 'Choose a category'))),
  publishedAt: z.iso.datetime({ local: true }),
})

export const createPostSchema = z.safeExtend(baseSchema, {
  coverImage: imageFieldCreate,
})

export type CreatePostSchema = z.infer<typeof createPostSchema>

export const updatePostSchema = z.safeExtend(baseSchema, {
  coverImage: imageField,
})

export type UpdatePostSchema = z.infer<typeof updatePostSchema>
export type UpsertPostSchema = CreatePostSchema | UpdatePostSchema
