import { motion, useReducedMotion } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { Section } from '../components/Section'
import { whatsappHref } from '../lib/links'

const cases = [
  {
    name: 'ERP empresarial',
    problem: 'Operação espalhada em planilhas e sistemas sem integração, gerando retrabalho e falta de controle.',
    result: 'Fechamento mensal 50% mais rápido e redução significativa de erros operacionais.',
    solution: 'Sistema centralizado com fluxos automatizados, controle por perfil e integração com financeiro e fiscal.',
  },
  {
    name: 'Automação de processos',
    problem: 'Equipe perdendo horas com tarefas manuais repetitivas e propensas a erro.',
    result: 'Dezenas de horas economizadas por mês e aumento de produtividade da equipe.',
    solution: 'Automação com integrações entre sistemas, filas de processamento e monitoramento em tempo real.',
  },
  {
    name: 'Power Platform / M365',
    problem: 'Processos descentralizados, aprovações confusas e dados duplicados.',
    result: 'Processos padronizados, rastreáveis e eliminação de retrabalho manual.',
    solution: 'Fluxos automatizados com integração entre SharePoint, Teams e sistemas internos.',
  },
  {
    name: 'Aplicativo mobile',
    problem: 'Equipe de campo sem acesso confiável a informações e processos.',
    result: 'Maior produtividade em campo e cumprimento consistente de SLAs.',
    solution: 'Aplicativo com funcionamento offline/online, sincronização automática e gestão de tarefas.',
  },
] as const

export function Portfolio() {
  const reduce = useReducedMotion()

  return (
    <Section id="portfolio" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Portfólio</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Casos reais de problemas resolvidos com tecnologia
          </h2>
          <p className="mt-4 text-lg leading-snug text-zinc-400">
            Veja como processos manuais e sistemas desconectados foram transformados em operações
            eficientes e escaláveis.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cases.map((c, i) => (
            <motion.article
              key={c.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-violet-500/25"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">{c.name}</h3>
              <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] font-semibold tracking-wide text-zinc-500">Problema</dt>
                  <dd className="mt-1.5 text-zinc-400">{c.problem}</dd>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] p-4 shadow-inner shadow-emerald-950/20">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Resultado
                  </dt>
                  <dd className="mt-2 text-[15px] font-semibold leading-snug text-emerald-50">{c.result}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-wide text-violet-400/95">Solução</dt>
                  <dd className="mt-1.5 text-zinc-300">{c.solution}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/[0.06] to-transparent px-6 py-10 text-center sm:px-10"
        >
          <p className="font-display text-xl font-semibold text-white sm:text-2xl">
            Seu caso pode ser o próximo
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/35 transition hover:brightness-110"
          >
            <SiWhatsapp aria-hidden className="h-5 w-5 shrink-0" />
            Falar sobre meu projeto
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
