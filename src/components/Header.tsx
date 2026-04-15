import { motion } from 'framer-motion'
import { useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { whatsappHref } from '../lib/links'

const nav = [
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Desafios', '#problemas'],
  ['Diferenciais', '#diferenciais'],
  ['Portfólio', '#portfolio'],
  ['Stack', '#tech'],
  ['Contato', '#contato'],
] as const

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-eden-950/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <a href="#topo" className="group flex items-center">
          <img
            src="/brand/logo-horizontal.svg"
            alt="Eden System"
            className="h-10 w-auto max-w-[240px] opacity-95 transition group-hover:opacity-100"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg text-white">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/5 bg-eden-950/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-zinc-300"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              <SiWhatsapp aria-hidden className="h-5 w-5 shrink-0" />
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </motion.header>
  )
}
