import User from '#models/user'
import { loginValidator } from '#validators/user'
import { errors as authErrors } from '@adonisjs/auth'

import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async index({ inertia }: HttpContext) {
    return inertia.render('admin/auth/login', {})
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user, rememberMe ?? false)

      return response.redirect().toRoute(user.role === 'admin' ? 'admin.dashboard' : 'home')
    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('inputErrorsBag', {
          email: 'Wrong email or password!',
        })

        return response.redirect().back()
      }

      return response.redirect().toRoute('admin.login')
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toRoute('home')
  }
}
