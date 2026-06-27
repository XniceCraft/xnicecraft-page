import { BaseCommand } from '@adonisjs/core/ace'
import User from '#models/user'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class InsertAdmin extends BaseCommand {
  static commandName = 'insert:admin'
  static description = 'Insert admin into users table'

  static options: CommandOptions = {
    /**
     * Start the app to access models and services
     */
    startApp: true,
  }

  async run() {
    const name = await this.prompt.ask('Enter name')

    const email = await this.prompt.ask('Enter email', {
      validate: (value) => (value.includes('@') ? true : 'Email is invalid'),
    })
    const password = await this.prompt.secure('Enter password', {
      validate: (value) => (value.length >= 8 ? true : 'Password must be at least 8 characters'),
    })

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      this.logger.info('User already exists')
      return
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
    })

    this.logger.info(`User ${user.email} created successfully`)
  }
}
