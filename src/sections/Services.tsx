import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/Section'

const items = [
  { title: 'Sistemas Web', desc: 'Portais, backoffice e plataformas sob medida com performance e segurança.', icon: '💻' },
  { title: 'APIs e Integrações', desc: 'Conecto ERPs, pagamentos, marketplaces, logística e outros sistemas sem retrabalho manual.', icon: '🔗' },
  { title: 'Automação (RPA)', desc: 'Rotinas repetitivas viram pipelines confiáveis com monitoramento, logs e alertas, sem intervenção humana.', icon: '🤖' },
  { title: 'Aplicativos', desc: 'Experiências mobile alinhadas ao seu processo e à sua marca, com sincronização e rastreio de tarefas.', icon: '📱' },
  { title: 'ERP / CRM', desc: 'Customização e evolução de sistemas que acompanham o negócio.', icon: '🏢' },
  {
    title: 'Power Automate',
    desc: 'Fluxos no ecossistema Microsoft: aprovações, notificações e integrações entre M365, SharePoint, Dynamics e centenas de conectores.',
    icon: '🔁',
  },
] as const

export function Services() {
  const reduce = useReducedMotion()

  return (
    <Section id="servicos" className="border-y border-white/5 bg-eden-900/40 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Serviços</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            O que eu construo para você ou sua empresa
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Soluções modulares que conversam entre si. Do MVP ao ecossistema completo.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, desc, icon }, i) => (
            <motion.article
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-violet-500/35"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-transparent to-blue-600/0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:from-violet-600/10 group-hover:to-blue-600/10" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl leading-none">
                    {icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}
