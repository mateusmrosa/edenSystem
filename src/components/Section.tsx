import type { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  )
}
