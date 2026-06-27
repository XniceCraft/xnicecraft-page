import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    '(home)/_components/about-section': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/about-section.tsx'))['default']>
    '(home)/_components/blog-section': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/blog-section.tsx'))['default']>
    '(home)/_components/contact-section': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/contact-section.tsx'))['default']>
    '(home)/_components/form/contact-form': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/form/contact-form.tsx'))['default']>
    '(home)/_components/hero-section': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/hero-section.tsx'))['default']>
    '(home)/_components/project-section': ExtractProps<(typeof import('../../inertia/pages/(home)/_components/project-section.tsx'))['default']>
    'admin/auth/login': ExtractProps<(typeof import('../../inertia/pages/admin/auth/login.tsx'))['default']>
    'admin/categories/_components/upsert-form': ExtractProps<(typeof import('../../inertia/pages/admin/categories/_components/upsert-form.tsx'))['default']>
    'admin/categories/create': ExtractProps<(typeof import('../../inertia/pages/admin/categories/create.tsx'))['default']>
    'admin/categories/edit': ExtractProps<(typeof import('../../inertia/pages/admin/categories/edit.tsx'))['default']>
    'admin/categories/index': ExtractProps<(typeof import('../../inertia/pages/admin/categories/index.tsx'))['default']>
    'admin/dashboard/index': ExtractProps<(typeof import('../../inertia/pages/admin/dashboard/index.tsx'))['default']>
    'admin/posts/_components/dialog/edit-image-dialog': ExtractProps<(typeof import('../../inertia/pages/admin/posts/_components/dialog/edit-image-dialog.tsx'))['default']>
    'admin/posts/_components/field/content-field': ExtractProps<(typeof import('../../inertia/pages/admin/posts/_components/field/content-field.tsx'))['default']>
    'admin/posts/_components/field/cover-image-field': ExtractProps<(typeof import('../../inertia/pages/admin/posts/_components/field/cover-image-field.tsx'))['default']>
    'admin/posts/_components/form/upsert-post-form': ExtractProps<(typeof import('../../inertia/pages/admin/posts/_components/form/upsert-post-form.tsx'))['default']>
    'admin/posts/create': ExtractProps<(typeof import('../../inertia/pages/admin/posts/create.tsx'))['default']>
    'admin/posts/edit': ExtractProps<(typeof import('../../inertia/pages/admin/posts/edit.tsx'))['default']>
    'admin/posts/index': ExtractProps<(typeof import('../../inertia/pages/admin/posts/index.tsx'))['default']>
    'blog/index': ExtractProps<(typeof import('../../inertia/pages/blog/index.tsx'))['default']>
    'errors/not-found': ExtractProps<(typeof import('../../inertia/pages/errors/not-found.tsx'))['default']>
    'errors/server-error': ExtractProps<(typeof import('../../inertia/pages/errors/server-error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}
