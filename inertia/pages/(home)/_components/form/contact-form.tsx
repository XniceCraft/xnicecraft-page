import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/mini'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const contactFormSchema = z.object({
  name: z.string().check(z.minLength(2, 'Name must be at least 2 characters long')),
  email: z.email(),
  message: z.string().check(z.minLength(10, 'Message must be at least 10 characters long')),
})

export function ContactForm({ ref }: { ref?: React.Ref<HTMLFormElement> }) {
  const { control, handleSubmit: formHandleSubmit } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const handleSubmit = useCallback((data: z.infer<typeof contactFormSchema>) => {
    console.log(data)
  }, [])

  return (
    <form
      ref={ref}
      className="flex flex-col gap-6 w-full"
      onSubmit={formHandleSubmit(handleSubmit)}
      aria-label="Contact form"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                className="text-ink bg-surface duration-fast ease-out placeholder:text-ink-3 hover:border-ink-2 focus:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-rule"
                type="text"
                required
                placeholder="Your name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                className="text-ink bg-surface duration-fast ease-out placeholder:text-ink-3 hover:border-ink-2 focus:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-rule"
                type="email"
                required
                placeholder="Your email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name="message"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Message</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Your message"
              className="text-ink bg-surface duration-fast ease-out placeholder:text-ink-3 hover:border-ink-2 focus:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-rule"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit">
        Send Message<span aria-hidden="true"> →</span>
      </Button>
    </form>
  )
}
