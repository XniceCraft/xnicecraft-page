import { useCallback, useId } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { EnvelopeIcon, LockIcon } from '@phosphor-icons/react'
import { loginSchema, type LoginSchema } from '@/lib/schema/auth'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { LoadingButton } from '@/components/button/loading-button'
import { Checkbox } from '@/components/ui/checkbox'

export default function Login() {
  const router = useRouter()
  const formPrefix = useId()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = useCallback(
    (data: LoginSchema) => {
      router.visit(
        { route: 'admin.login.store' },
        {
          method: 'post',
          data,
          preserveState: true,
          onError: (errs) => {
            Object.entries(errs).forEach(([field, message]) => {
              setError(field as keyof LoginSchema, { message })
            })
          },
        }
      )
    },
    [router, setError]
  )

  return (
    <>
      <Head title="Admin Login" />

      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-paper px-4">
        <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface px-6 py-7 shadow-sm shadow-ink/5">
          <div className="mb-6">
            <h2 className="text-lg font-semibold tracking-tight text-ink">Sign in</h2>
            <p className="mt-1 text-sm text-ink-3">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formPrefix}-${field.name}`}>Email</FieldLabel>
                  <div className="relative">
                    <EnvelopeIcon
                      size={15}
                      weight="regular"
                      className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-3"
                    />
                    <Input
                      {...field}
                      id={`${formPrefix}-${field.name}`}
                      type="email"
                      placeholder="admin@example.com"
                      className="pl-8"
                      required
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formPrefix}-${field.name}`}>Password</FieldLabel>
                  <div className="relative">
                    <LockIcon
                      size={15}
                      weight="regular"
                      className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-3"
                    />
                    <Input
                      {...field}
                      id={`${formPrefix}-${field.name}`}
                      type="password"
                      placeholder="Your password"
                      className="pl-8"
                      required
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="rememberMe"
              control={control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <Checkbox
                    id={`${formPrefix}-${field.name}`}
                    name={field.name}
                    disabled={field.disabled}
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor={`${formPrefix}-${field.name}`}>Remember me</FieldLabel>
                </Field>
              )}
            />

            <Field>
              <LoadingButton
                type="submit"
                size="lg"
                loading={isSubmitting}
                className="mt-2 w-full gap-2"
              >
                Sign in
              </LoadingButton>
            </Field>
          </form>
        </div>
      </main>
    </>
  )
}
