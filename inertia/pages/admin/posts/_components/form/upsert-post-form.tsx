import { Button } from '@/components/ui/button'
import { Controller, type Control } from 'react-hook-form'
import { ContentField } from '../field/content-field'
import { CoverImageField } from '../field/cover-image-field'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from '@adonisjs/inertia/react'
import { LoadingButton } from '@/components/button/loading-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FloppyDiskIcon } from '@phosphor-icons/react'

import type { UpsertPostSchema } from '@/lib/schema/post'
import type { Data } from '@generated/data'

export function UpsertPostForm({
  control,
  onSubmit,
  isSubmitting,
  categories,
}: {
  control: Control<UpsertPostSchema>
  onSubmit: React.SubmitEventHandler<HTMLFormElement>
  isSubmitting: boolean
  categories: Data.Category[]
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
      <section
        className="min-w-0 rounded-3xl border border-rule bg-surface p-5 shadow-sm sm:p-6 space-y-4"
        aria-label="Post content"
      >
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Building with Inertia and AdonisJS"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="excerpt"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Excerpt</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="A short summary."
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Content</FieldLabel>
              <ContentField value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </section>

      <aside
        className="rounded-3xl border border-rule bg-surface p-5 shadow-sm sm:p-6"
        aria-label="Publishing settings"
      >
        <h2 className="text-lg font-semibold text-ink">Publishing</h2>
        <p className="mt-1 text-sm leading-6 text-ink-3">
          Set the post status, category, and optional cover image.
        </p>

        <div className="mt-5 grid gap-5">
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="categoryId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select
                  name={field.name}
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={field.disabled || categories.length === 0}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Set category" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="publishedAt"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Published At</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="datetime-local"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="coverImage"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Cover Image</FieldLabel>
                <CoverImageField
                  existingImage={field.value?.type === 'keep' ? field.value.url : undefined}
                  onChange={field.onChange}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3">
          <Button asChild variant="outline" type="button">
            <Link route="admin.posts.index">Cancel</Link>
          </Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            icon={<FloppyDiskIcon className="size-4" aria-hidden="true" />}
          >
            Save post
          </LoadingButton>
        </div>
      </aside>
    </form>
  )
}
