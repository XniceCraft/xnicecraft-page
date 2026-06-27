/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  home: typeof routes['home']
  admin: {
    login: typeof routes['admin.login'] & {
      store: typeof routes['admin.login.store']
    }
    dashboard: typeof routes['admin.dashboard']
    categories: {
      index: typeof routes['admin.categories.index']
      create: typeof routes['admin.categories.create']
      store: typeof routes['admin.categories.store']
      edit: typeof routes['admin.categories.edit']
      update: typeof routes['admin.categories.update']
      destroy: typeof routes['admin.categories.destroy']
    }
    posts: {
      index: typeof routes['admin.posts.index']
      create: typeof routes['admin.posts.create']
      store: typeof routes['admin.posts.store']
      edit: typeof routes['admin.posts.edit']
      update: typeof routes['admin.posts.update']
      destroy: typeof routes['admin.posts.destroy']
    }
  }
  session: {
    destroy: typeof routes['session.destroy']
  }
  attachments: typeof routes['attachments']
}
