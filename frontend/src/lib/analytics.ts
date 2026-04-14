const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

export function initAnalytics() {
  if (!measurementId || typeof window === 'undefined') return

  const w = window as any
  if (w.__gaInitialized) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: any[]) {
    w.dataLayer.push(args)
  }

  w.gtag('js', new Date())
  w.gtag('config', measurementId)
  w.__gaInitialized = true
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as any
  if (!measurementId || typeof window === 'undefined' || typeof w.gtag !== 'function') return
  w.gtag('event', name, params ?? {})
}
