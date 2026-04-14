import { motion, useReducedMotion } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { whatsappHref } from '../lib/links'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <div
      id="topo"
      className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute -right-24 top-40 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="absolute bottom-0 left-1/2 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        {!reduce ? (
          <motion.div
            className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-400/10 blur-3xl"
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-violet-200/90"
        >
          Eden System
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]"
        >
          Transformo operações manuais em{' '}
          <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-200 bg-clip-text text-transparent">
            sistemas escaláveis e confiáveis
          </span>{' '}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-400 sm:text-xl"
        >
          Automatize processos, reduza erros e ganhe controle real da sua operação.
          Sem planilhas frágeis, sem retrabalho, sem improviso.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#25D366]/35 transition hover:brightness-110 hover:shadow-[#25D366]/45 sm:w-auto"
          >
            <SiWhatsapp aria-hidden className="h-5 w-5 shrink-0" />
            Falar no WhatsApp
          </a>
          <a
            href="#servicos"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Ver serviços
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 text-sm font-medium text-zinc-400"
        >
          Processos manuais custam tempo e dinheiro, resolva isso com engenharia, não com planilhas frágeis e sem controle.
        </motion.p>
      </div>
    </div>
  )
}
