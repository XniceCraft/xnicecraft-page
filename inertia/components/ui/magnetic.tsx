import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Slot } from 'radix-ui'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

interface MagneticProps {
  children: React.ReactNode
  range?: number
  strength?: number
  className?: string
  asChild?: boolean
}

export function Magnetic({
  children,
  range = 60,
  strength = 0.35,
  className,
  asChild,
  ...props
}: MagneticProps & React.ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null)
  const Comp = asChild ? Slot.Root : 'div'

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current
      if (!el) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' })
      let rect = el.getBoundingClientRect()

      let resizeTimeout: ReturnType<typeof setTimeout>
      const updateRect = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          rect = el.getBoundingClientRect()
        }, 150)
      }

      const handleMouseMove = contextSafe!((e: MouseEvent) => {
        const { clientX, clientY } = e

        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        const distanceX = clientX - x
        const distanceY = clientY - y
        const distance = Math.hypot(distanceX, distanceY)

        if (distance < range) {
          xTo(distanceX * strength)
          yTo(distanceY * strength)
        } else {
          xTo(0)
          yTo(0)
        }
      })

      const handleMouseLeave = contextSafe!(() => {
        xTo(0)
        yTo(0)
      })

      window.addEventListener('resize', updateRect)
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        clearTimeout(resizeTimeout)
        window.removeEventListener('resize', updateRect)
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    [range, strength]
  )

  return (
    <Comp ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </Comp>
  )
}
