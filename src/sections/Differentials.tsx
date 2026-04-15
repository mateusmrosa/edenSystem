import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/Section'

const diff = [
  {
    title: 'Soluções sob medida para o seu negócio',
    body: 'Nada de sistemas genéricos que não se encaixam. Desenvolvemos soluções alinhadas ao seu processo sem adaptações forçadas ou retrabalho.',
    icon: '💡',
  },
  {
    title: 'Foco em resultado que impacta o negócio',
    body: 'Não entregamos só código. Criamos soluções que sua equipe realmente usa com impacto direto na operação e nos resultados.',
    icon: '🎯',
  },
  {
    title: 'Comunicação direta, sem ruído',
    body: 'Você fala com quem constrói. Sem intermediários, sem retrabalho decisões mais rápidas e alinhadas.',
    icon: '💬',
  },
  {
    title: 'Entrega rápida com previsibilidade',
    body: 'Ciclos curtos, prioridades claras e total visibilidade. Você acompanha o progresso e sabe exatamente o que está sendo entregue.',
    icon: '⚡',
  },
] as const

export function Differentials() {
  const reduce = useReducedMotion()

  return (
    <Section id="diferenciais" className="border-y border-white/5 bg-gradient-to-b from-eden-900/80 to-eden-950 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Diferenciais</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Por que trabalhar com a Eden System
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {diff.map(({ title, body, icon }, i) => {
            return (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl leading-none">
                  {icon}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
            </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
