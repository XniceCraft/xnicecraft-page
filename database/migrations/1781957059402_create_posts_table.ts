import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('categories.id').nullable()
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.string('excerpt', 255).nullable()
      table.integer('read_time').unsigned().notNullable().defaultTo(0)
      table.json('content').nullable()
      table.json('cover_image').nullable()
      table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft').notNullable()
      table.timestamp('published_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
