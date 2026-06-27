import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Head } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Link, useRouter } from '@adonisjs/inertia/react'
import { LoadingButton } from '@/components/button/loading-button'
import { ArrowLeftIcon, FloppyDiskIcon } from '@phosphor-icons/react'
import { upsertCategorySchema, type UpsertCategorySchema } from '@/lib/schema/category'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'

export default function EditCategoryPage({
  category,
}: InertiaProps<{
  category: Data.Category
}>) {
  const router = useRouter()
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<UpsertCategorySchema>({
    resolver: zodResolver(upsertCategorySchema),
    defaultValues: {
      name: category.name,
    },
  })

  const onSubmit = useCallback(
    (data: UpsertCategorySchema) => {
      router.visit(
        {
          route: 'admin.categories.update',
          routeParams: { slug: category.slug },
        },
        {
          method: 'post',
          data,
          preserveState: true,
          onError: (errors) => {
            Object.entries(errors).forEach(([field, message]) => {
              setError(field as keyof UpsertCategorySchema, {
                message,
              })
            })
          },
        }
      )
    },
    [category.slug, router, setError]
  )

  return (
    <>
      <Head title={`Edit ${category.name}`} />

      <AdminLayout>
        <AdminContainer>
          <header className="border-b border-rule pb-6">
            <Button asChild variant="ghost" size="sm" className="mb-5 px-0">
              <Link href="/admin/category">
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                Back to categories
              </Link>
            </Button>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
              Edit category
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 font-mono text-sm text-ink-3">/{category.slug}</p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-rule bg-surface p-5 shadow-sm sm:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button asChild variant="outline" type="button">
                <Link href="/admin/category">Cancel</Link>
              </Button>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                icon={<FloppyDiskIcon className="size-4" aria-hidden="true" />}
              >
                Save changes
              </LoadingButton>
            </div>
          </form>
        </AdminContainer>
      </AdminLayout>
    </>
  )
}
