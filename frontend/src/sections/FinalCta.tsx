import { motion, useReducedMotion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { Section } from '../components/Section'
import { trackEvent } from '../lib/analytics'
import { submitContact } from '../lib/api'
import { whatsappHref } from '../lib/links'

export function FinalCta() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [formStartedAt] = useState(() => Date.now())
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim()

  async function getRecaptchaToken(): Promise<string> {
    if (!recaptchaSiteKey || typeof window === 'undefined') return ''

    const w = window as any
    if (!w.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Falha ao carregar reCAPTCHA'))
      })
    }

    await new Promise<void>((resolve) => w.grecaptcha.ready(() => resolve()))
    return String(await w.grecaptcha.execute(recaptchaSiteKey, { action: 'contact_form' }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const msg = String(fd.get('message') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const startedAt = Number(fd.get('form_started_at') ?? formStartedAt)

    if (!name || !email || !msg) {
      setStatus('error')
      setMessage('Preencha nome, e-mail e mensagem.')
      return
    }

    setStatus('loading')
    setMessage('')
    try {
      const recaptchaToken = await getRecaptchaToken()
      if (recaptchaSiteKey && !recaptchaToken) {
        throw new Error('Falha na validação de segurança. Recarregue a página e tente novamente.')
      }

      const res = await submitContact({
        name,
        email,
        phone: phone || undefined,
        message: msg,
        company: company || '',
        form_started_at: startedAt,
        recaptcha_token: recaptchaToken,
      })
      setStatus('ok')
      setMessage(res.message)
      trackEvent('generate_lead', { method: 'contact_form' })
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Falha no envio.')
      trackEvent('contact_form_error')
    }
  }

  return (
    <Section id="contato" className="px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-eden-900 to-blue-600/15 p-[1px] shadow-2xl shadow-violet-950/40"
        >
          <div className="rounded-[1.4rem] bg-eden-950/95 px-6 py-12 sm:px-10 sm:py-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">CTA</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Vamos automatizar sua empresa?
                </h2>
                <p className="mt-4 text-lg text-zinc-400">
                  Conte em poucas linhas o que está travando hoje. Eu respondo com clareza sobre
                  escopo, prazo e próximos passos.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/35 transition hover:brightness-110 hover:shadow-[#25D366]/45"
                >
                  <SiWhatsapp aria-hidden className="h-5 w-5 shrink-0" />
                  Falar no WhatsApp
                </a>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  type="hidden"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                />
                <input
                  type="hidden"
                  name="form_started_at"
                  value={formStartedAt}
                />
                <div>
                  <label htmlFor="name" className="sr-only">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Nome"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-violet-500/50 placeholder:text-zinc-600 focus:ring-2"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="E-mail"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-violet-500/50 placeholder:text-zinc-600 focus:ring-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Telefone (opcional)"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-violet-500/50 placeholder:text-zinc-600 focus:ring-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Qual processo você quer transformar?"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-violet-500/50 placeholder:text-zinc-600 focus:ring-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition enabled:hover:brightness-110 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
                </button>
                {message ? (
                  <p
                    className={`text-sm ${status === 'ok' ? 'text-emerald-400' : status === 'error' ? 'text-red-400' : 'text-zinc-500'}`}
                  >
                    {message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
