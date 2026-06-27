/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router
      .group(() => {
        router.get('/login', [controllers.admin.Session, 'index']).as('admin.login')
        router.post('/login', [controllers.admin.Session, 'store']).as('admin.login.store')
      })
      .use(middleware.guest())

    router
      .group(() => {
        router.get('/', [controllers.admin.Dashboard, 'index']).as('admin.dashboard')
        router
          .group(() => {
            router.get('/', [controllers.admin.Categories, 'index']).as('admin.categories.index')
            router
              .get('/create', [controllers.admin.Categories, 'create'])
              .as('admin.categories.create')
            router.post('/', [controllers.admin.Categories, 'store']).as('admin.categories.store')
            router
              .get('/:slug/edit', [controllers.admin.Categories, 'edit'])
              .as('admin.categories.edit')
            router
              .post('/:slug', [controllers.admin.Categories, 'update'])
              .as('admin.categories.update')
            router
              .post('/:slug/delete', [controllers.admin.Categories, 'destroy'])
              .as('admin.categories.destroy')
          })
          .prefix('/categories')
        router
          .group(() => {
            router.get('/', [controllers.admin.Posts, 'index']).as('admin.posts.index')
            router.get('/create', [controllers.admin.Posts, 'create']).as('admin.posts.create')
            router.post('/', [controllers.admin.Posts, 'store']).as('admin.posts.store')
            router.get('/:slug/edit', [controllers.admin.Posts, 'edit']).as('admin.posts.edit')
            router.post('/:slug', [controllers.admin.Posts, 'update']).as('admin.posts.update')
            router
              .post('/:slug/delete', [controllers.admin.Posts, 'destroy'])
              .as('admin.posts.destroy')
          })
          .prefix('/posts')

        router.post('/logout', [controllers.admin.Session, 'destroy'])
      })
      .use([middleware.auth(), middleware.ensureAdmin()])
  })
  .prefix('/admin')

router.attachments()
