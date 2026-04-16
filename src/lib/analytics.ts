const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

type AnalyticsWindow = Window & {
  __gaInitialized?: boolean
  __gaPageListenerBound?: boolean
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

export function initAnalytics() {
  if (!measurementId || typeof window === 'undefined') return

  const w = window as AnalyticsWindow
  if (w.__gaInitialized) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  const dataLayer = (w.dataLayer ??= [])
  w.gtag = function gtag(...args: unknown[]) {
    dataLayer.push(args)
  }

  w.gtag('js', new Date())
  w.gtag('config', measurementId, { send_page_view: false })
  w.__gaInitialized = true
  bindPageViewTracking()
  trackPageView()
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as AnalyticsWindow
  if (!measurementId || typeof window === 'undefined' || typeof w.gtag !== 'function') return
  w.gtag('event', name, params ?? {})
}

export function trackPageView(path = window.location.pathname + window.location.search + window.location.hash) {
  const w = window as AnalyticsWindow
  if (!measurementId || typeof window === 'undefined' || typeof w.gtag !== 'function') return

  w.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

function bindPageViewTracking() {
  const w = window as AnalyticsWindow
  if (typeof window === 'undefined' || w.__gaPageListenerBound) return

  const notifyPageChange = () => {
    trackPageView()
  }

  const { history } = window
  const originalPushState = history.pushState.bind(history)
  const originalReplaceState = history.replaceState.bind(history)

  history.pushState = function pushState(...args) {
    originalPushState(...args)
    notifyPageChange()
  }

  history.replaceState = function replaceState(...args) {
    originalReplaceState(...args)
    notifyPageChange()
  }

  window.addEventListener('popstate', notifyPageChange)
  window.addEventListener('hashchange', notifyPageChange)
  w.__gaPageListenerBound = true
}
