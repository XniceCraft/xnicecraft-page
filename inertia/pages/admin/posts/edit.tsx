import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { UpsertPostForm } from './_components/form/upsert-post-form'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { updatePostSchema, type UpdatePostSchema } from '@/lib/schema/post'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'

export default function EditPostPage({
  post,
  categories,
}: InertiaProps<{
  post: Data.Post.Variants['withDetail']
  categories: Data.Category[]
}>) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      coverImage: { type: 'keep', url: post.coverImage },
      title: post.title,
      excerpt: post.excerpt ?? '',
      content: post.content,
      categoryId: post.categoryId ?? undefined,
      status: post.status,
      publishedAt: post.publishedAt ?? undefined,
    },
  })

  const onSubmit = useCallback(
    (data: UpdatePostSchema) => {
      router.visit(
        {
          route: 'admin.posts.update',
          routeParams: { slug: post.slug },
        },
        {
          method: 'post',
          data,
          forceFormData: true,
          preserveState: true,
          onError: (errors) => {
            Object.entries(errors).forEach(([field, message]) => {
              setError(field as keyof UpdatePostSchema, {
                message,
              })
            })
          },
        }
      )
    },
    [router, setError, post.slug]
  )

  return (
    <>
      <Head title={`Edit ${post.title}`} />

      <AdminLayout>
        <AdminContainer>
          <header className="border-b border-rule pb-6">
            <Button asChild variant="ghost" size="sm" className="mb-5 px-0">
              <Link route="admin.posts.index">
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                Back to posts
              </Link>
            </Button>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">Edit post</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 font-mono text-sm text-ink-3">/{post.slug}</p>
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
