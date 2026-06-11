import { motion, useReducedMotion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'
import { SiWhatsapp } from 'react-icons/si'
import { Section } from '../components/Section'
import { orcamentoWhatsappHref } from '../lib/links'

const scopeItems = [
  'Cadastro e gerenciamento de clientes',
  'Controle de usuários e acessos',
  'Área exclusiva para cada cliente',
  'Dashboard com indicadores principais: Receitas, Despesas, Impostos e Folha de pagamento',
  'Comparativos: mês atual x mês anterior e ano atual x ano anterior',
  'Gráficos e indicadores visuais',
  'Importação de dados via Excel e CSV',
  'Plataforma responsiva para computador, tablet e celular',
  'Hospedagem em nuvem',
] as const

const monthlyItems = [
  'Hospedagem',
  'Banco de dados',
  'Backups',
  'Monitoramento',
  'Correções de eventuais falhas',
  'Suporte técnico',
] as const

const paymentSteps = [
  { label: 'Na contratação', value: '50%' },
  { label: 'Na entrega da primeira versão', value: '50%' },
] as const

export function OrcamentoPage() {
  const reduce = useReducedMotion()

  return (
    <>
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
              Proposta comercial
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Fase 1 — Plataforma de Indicadores Gerenciais
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Escritório contábil · Escopo da primeira versão (MVP)
            </p>
          </motion.div>
        </div>
      </Section>

      <Section className="border-y border-white/5 bg-eden-900/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Escopo</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              O que está incluso na primeira versão
            </h2>
          </motion.div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {scopeItems.map((item, i) => (
              <motion.li
                key={item}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <FaCircleCheck
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-violet-400"
                />
                <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Prazo estimado
              </p>
              <p className="mt-4 font-display text-3xl font-semibold text-white">30 a 45 dias</p>
            </motion.article>

            <motion.article
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/15 via-white/[0.03] to-blue-600/10 p-8 lg:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                  Investimento de implantação
                </p>
                <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  R$ 4.900,00
                </p>
                <p className="mt-3 text-sm text-zinc-400">Valor único para desenvolvimento e entrega do MVP</p>
              </div>
            </motion.article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Forma de pagamento
              </p>
              <ul className="mt-6 space-y-4">
                {paymentSteps.map(({ label, value }) => (
                  <li
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-zinc-400">{label}</span>
                    <span className="font-display text-2xl font-semibold text-white">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Mensalidade da plataforma
              </p>
              <p className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
                R$ 297,00<span className="text-lg font-normal text-zinc-500">/mês</span>
              </p>
              <p className="mt-4 text-sm font-medium text-zinc-300">Incluso na mensalidade:</p>
              <ul className="mt-4 space-y-3">
                {monthlyItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-400">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5 bg-eden-900/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:p-10"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Observação
              </p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                <p>
                  Esta proposta contempla a primeira fase do projeto, focada na validação da ideia e
                  disponibilização dos principais indicadores gerenciais aos clientes do escritório.
                </p>
                <p>
                  Módulos avançados de planejamento tributário, simulações e relatórios estratégicos
                  poderão ser desenvolvidos em uma segunda etapa.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="mt-12 flex flex-col items-center gap-4 text-center"
          >
            <p className="max-w-xl text-sm text-zinc-500">
              Dúvidas ou quer avançar com a proposta? Fale diretamente com a Eden System.
            </p>
            <a
              href={orcamentoWhatsappHref}
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
    </>
  )
}
