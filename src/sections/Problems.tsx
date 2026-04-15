import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/Section'

const problems = [
  'Planilhas confusas que ninguém confia 100%',
  'Processos manuais que travam quando o volume sobe',
  'Sistemas desconectados e dados duplicados',
  'Falta de controle: você só descobre o problema depois',
] as const

export function Problems() {
  const reduce = useReducedMotion()

  return (
    <Section id="problemas" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Diagnóstico</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Problemas que eu resolvo
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Se algum item abaixo soa familiar, provavelmente já passou da hora de estruturar o digital
            do seu negócio.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {problems.map((text, i) => (
            <motion.li
              key={text}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-eden-850/80 px-5 py-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-lg font-bold leading-none text-red-300">
                ×
              </span>
              <span className="pt-1 text-sm leading-relaxed text-zinc-300 sm:text-base">{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
