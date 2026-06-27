import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EnsureAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user

    if (!user) return ctx.response.redirect().toRoute('session.index')

    if (user.role !== 'admin') return ctx.response.redirect().toRoute('home')

    return next()
  }
}
