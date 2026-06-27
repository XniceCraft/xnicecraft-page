import { z } from 'zod/mini'

export const upsertCategorySchema = z.object({
  name: z.string().check(z.maxLength(255, 'Maximum length is 255 characters')),
})

export type UpsertCategorySchema = z.infer<typeof upsertCategorySchema>
