import { z } from 'zod/mini'

export const image = z
  .file()
  .check(
    z.maxSize(5 * 1024 * 1024, 'Maximum file size is 5MB'),
    z.mime(['image/png', 'image/jpeg', 'image/webp'])
  )

export const imageField = z.discriminatedUnion('type', [
  z.object({ type: z.literal('keep'), url: z.string() }),
  z.object({ type: z.literal('replace'), file: image }),
])

export const imageFieldCreate = imageField.check(
  z.refine((val) => val.type === 'replace', { message: 'Image is required' })
)

export type ImageField = z.infer<typeof imageField>
export type ImageFieldCreate = z.infer<typeof imageFieldCreate>
