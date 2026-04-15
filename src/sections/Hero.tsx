import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { whatsappHref } from '../lib/links'

export function Hero() {
  const reduce = useReducedMotion()
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const highlights = [
    {
      title: 'Automatize processos',
      description: 'Fluxos consistentes para tirar tarefas repetitivas da rotina.',
    },
    {
      title: 'Reduza erros',
      description: 'Menos retrabalho com regras claras e operação organizada.',
    },
    {
      title: 'Ganhe controle real',
      description: 'Visibilidade para decidir melhor e crescer com previsibilidade.',
    },
  ]

  useEffect(() => {
    const target = cardsRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduce) return

    const onScroll = () => {
      const scrollY = window.scrollY
      // Keep movement very subtle to avoid distraction.
      setParallaxOffset(Math.min(scrollY * 0.04, 22))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduce])

  return (
    <div
      id="topo"
      className="relative isolate min-h-screen overflow-hidden px-4 pb-[132px] pt-[120px] sm:px-6 sm:pb-[148px] sm:pt-[128px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Flat-safe gradient: no grid/stacked overlays that can produce visible blocks. */}
        <div className="absolute inset-0 bg-[radial-gradient(95%_62%_at_50%_8%,rgba(59,130,246,0.12)_0%,rgba(2,6,23,0)_65%),radial-gradient(72%_48%_at_50%_88%,rgba(109,40,217,0.1)_0%,rgba(2,6,23,0)_70%)]" />
        <div
          className="absolute left-1/2 top-[12%] h-[20rem] w-[min(68vw,40rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(167,139,250,0.14)_0%,rgba(56,189,248,0.08)_44%,rgba(2,6,23,0)_74%)] blur-2xl"
          style={{ transform: reduce ? undefined : `translate3d(-50%, ${parallaxOffset * 0.35}px, 0)` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-violet-200/90"
        >
          Eden System
        </motion.p>
        {/* Dedicated glow behind heading to strengthen visual hierarchy */}
        <div className="relative mx-auto max-w-4xl">
          {/* Localized heading glow for hierarchy, still off-center and subtle. */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-64 w-[min(78vw,44rem)] rounded-full bg-[radial-gradient(circle_at_52%_45%,rgba(139,92,246,0.24)_0%,rgba(56,189,248,0.14)_40%,rgba(2,6,23,0)_74%)] blur-2xl" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: 'easeOut' }}
            className="relative font-display text-balance text-[clamp(2.25rem,5.2vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.032em] text-white"
          >
            <span className="block">Transformo operações manuais em</span>
            <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-200 bg-clip-text text-transparent">
              sistemas escaláveis e confiáveis
            </span>{' '}
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Automatize processos, reduza erros e ganhe controle real da sua operação.
          Sem planilhas frágeis, sem retrabalho, sem improviso.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 ease-out before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.28),rgba(255,255,255,0)_72%)] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_22px_48px_-18px_rgba(37,211,102,0.72)] hover:before:opacity-100 sm:w-auto"
          >
            <SiWhatsapp aria-hidden className="relative z-[1] h-5 w-5 shrink-0" />
            <span className="relative z-[1]">Falar no WhatsApp</span>
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
          transition={{ delay: 0.46, duration: 0.7, ease: 'easeOut' }}
          className="mt-7 text-sm font-medium text-zinc-400"
        >
          Processos manuais custam tempo e dinheiro, resolva isso com engenharia, não com planilhas frágeis e sem controle.
        </motion.p>

        <motion.div
          ref={cardsRef}
          initial={false}
          animate={
            cardsVisible
              ? { opacity: 1, y: 0 }
              : { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 }
          }
          transition={{ duration: 0.78, delay: 0.42, ease: 'easeOut' }}
          className="mt-12 grid gap-4 text-left sm:mt-14 sm:grid-cols-3"
        >
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-5 shadow-[0_16px_38px_-30px_rgba(76,29,149,0.75)] backdrop-blur-md transition-all duration-300 ease-out before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.07)_45%,rgba(255,255,255,0)_100%)] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:-translate-y-2 hover:border-violet-200/35 hover:bg-white/[0.06] hover:shadow-[0_34px_72px_-34px_rgba(109,40,217,0.78)] hover:before:opacity-100 ${index === 1 ? 'sm:-translate-y-1' : ''}`}
            >
              <p className="relative z-[1] text-sm font-semibold text-white">{item.title}</p>
              <p className="relative z-[1] mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
