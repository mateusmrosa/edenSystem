import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/Section'

export function About() {
  const reduce = useReducedMotion()

  return (
    <Section id="sobre" className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Sobre</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tecnologia aplicada para resolver problemas reais
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-400">
              <p>Não se trata apenas de desenvolver software.</p>
              <p>
                Se trata de entender onde sua operação perde tempo, dinheiro, controle e resolver
                isso com tecnologia.
              </p>
              <p>
                Atuo criando sistemas sob medida que organizam processos, eliminam retrabalho e
                trazem previsibilidade para o negócio.
              </p>
            </div>
            <ul className="mt-8 space-y-4 text-zinc-400">
              {[
                'Arquitetura preparada para crescimento e escala',
                'Comunicação direta com quem desenvolve',
                'Processos organizados, sem dependência de planilhas',
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 shadow-2xl shadow-violet-950/50">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
            <blockquote className="relative font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
              <span className="block">
                Sistemas bem construídos não só organizam sua operação,
              </span>
              <span className="mt-1 block">
                eles reduzem custos, evitam erros e sustentam o crescimento.
              </span>
            </blockquote>
            <p className="relative mt-6 text-sm text-zinc-500">
              Tecnologia aplicada com visão de negócio.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
