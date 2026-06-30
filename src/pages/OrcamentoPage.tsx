import { motion, useReducedMotion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'
import { SiWhatsapp } from 'react-icons/si'
import { Navigate, useParams } from 'react-router-dom'
import { Section } from '../components/Section'
import type { OrcamentoProposal } from '../data/orcamentos'
import { getOrcamento } from '../data/orcamentos'
import { WHATSAPP_NUMBER } from '../lib/links'

function whatsappHrefFor(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function Hero({ proposal }: { proposal: OrcamentoProposal }) {
  const reduce = useReducedMotion()

  return (
    <Section id="topo" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.18),transparent)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            {proposal.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {proposal.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">{proposal.subtitle}</p>
        </motion.div>
      </div>
    </Section>
  )
}

function PackagesProposal({ proposal }: { proposal: OrcamentoProposal }) {
  const reduce = useReducedMotion()

  return (
    <Section className="border-y border-white/5 bg-eden-900/40 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-12">
        {proposal.packages.map((pkg, pkgIndex) => (
          <motion.article
            key={pkg.label}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: pkgIndex * 0.05 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            <div className="border-b border-white/5 bg-gradient-to-r from-violet-600/10 via-transparent to-blue-600/10 px-6 py-8 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                {pkg.label}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {pkg.title}
              </h2>
              <p className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
                {pkg.price}
              </p>
              {pkg.priceNote ? <p className="mt-2 text-sm text-zinc-400">{pkg.priceNote}</p> : null}
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-8">
              {pkg.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-300">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                        <FaCircleCheck
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 text-violet-400"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {pkg.notes?.length ? (
                <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  {pkg.notes.map((note) => (
                    <p key={note} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {note}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function FooterCta({ proposal }: { proposal: OrcamentoProposal }) {
  const reduce = useReducedMotion()

  return (
    <Section className="border-t border-white/5 bg-eden-900/40 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="max-w-xl text-sm text-zinc-500">
            Dúvidas ou quer avançar com a proposta? Fale diretamente com a Eden System.
          </p>
          <a
            href={whatsappHrefFor(proposal.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-110"
          >
            <SiWhatsapp aria-hidden className="h-5 w-5 shrink-0" />
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </Section>
  )
}

export function OrcamentoPage() {
  const { slug } = useParams()
  if (!slug) {
    return <Navigate to="/" replace />
  }

  const proposal = getOrcamento(slug)
  if (!proposal) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Hero proposal={proposal} />
      <PackagesProposal proposal={proposal} />
      <FooterCta proposal={proposal} />
    </>
  )
}
