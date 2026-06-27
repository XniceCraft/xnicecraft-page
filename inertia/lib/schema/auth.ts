import { z } from 'zod/mini'

export const loginSchema = z.object({
  email: z.string().check(z.minLength(1, 'Email is required'), z.email('Enter a valid email')),
  password: z.string().check(z.minLength(1, 'Password is required')),
  rememberMe: z.optional(z.boolean()),
})

export type LoginSchema = z.infer<typeof loginSchema>
