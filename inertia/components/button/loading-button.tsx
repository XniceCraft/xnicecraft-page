import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function LoadingButton({
  icon,
  loading,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  icon?: React.ReactNode
  loading?: boolean
}) {
  return (
    <Button {...props} disabled={disabled || loading}>
      {loading ? <Spinner /> : icon}
      {children}
    </Button>
  )
}
