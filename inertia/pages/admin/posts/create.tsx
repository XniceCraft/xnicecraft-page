import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { UpsertPostForm } from './_components/form/upsert-post-form'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { createPostSchema, CreatePostSchema } from '@/lib/schema/post'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'

export default function CreatePostPage({
  categories,
}: InertiaProps<{
  categories: Data.Category[]
}>) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      coverImage: undefined,
      title: '',
      excerpt: '',
      content: undefined,
      categoryId: undefined,
      status: 'draft',
      publishedAt: '',
    },
  })

  const onSubmit = useCallback(
    (data: CreatePostSchema) => {
      router.visit(
        {
          route: 'admin.posts.store',
        },
        {
          method: 'post',
          data,
          forceFormData: true,
          preserveState: true,
          onError: (errors) => {
            Object.entries(errors).forEach(([field, message]) => {
              setError(field as keyof CreatePostSchema, {
                message,
              })
            })
          },
        }
      )
    },
    [router, setError]
  )

  return (
    <>
      <Head title="Create post" />

      <AdminLayout>
        <AdminContainer>
          <header className="border-b border-rule pb-6">
            <Button asChild variant="ghost" size="sm" className="mb-5 px-0">
              <Link route="admin.posts.index">
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                Back to posts
              </Link>
            </Button>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">New post</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Create post
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink-2 sm:text-base">
              Draft the article, prepare metadata, and choose when it should appear on the website.
            </p>
          </header>

          <UpsertPostForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            categories={categories}
          />
        </AdminContainer>
      </AdminLayout>
    </>
  )
}
