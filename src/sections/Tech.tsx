import { motion, useReducedMotion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaAws, FaMicrosoft } from 'react-icons/fa6'
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiGithub,
  SiGithubactions,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
} from 'react-icons/si'
import { Section } from '../components/Section'

const stack = [
  { name: 'Laravel', Icon: SiLaravel, color: 'text-[#FF2D20]' },
  { name: '.NET', Icon: SiDotnet, color: 'text-[#512BD4]' },
  { name: 'React', Icon: SiReact, color: 'text-[#61DAFB]' },
  { name: 'Angular', Icon: SiAngular, color: 'text-[#DD0031]' },
  { name: 'Node', Icon: SiNodedotjs, color: 'text-[#5FA04E]' },
  { name: 'SQL', Icon: SiMysql, color: 'text-[#4479A1]' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-[#336791]' },
  { name: 'Linux', Icon: SiLinux, color: 'text-[#FCC624]' },
  { name: 'Docker', Icon: SiDocker, color: 'text-[#2496ED]' },
  { name: 'AWS', Icon: FaAws, color: 'text-[#FF9900]' },
  { name: 'GitHub', Icon: SiGithub, color: 'text-[#F0F6FC]' },
  { name: 'GitHub Actions', Icon: SiGithubactions, color: 'text-[#2088FF]' },
  { name: 'Python', Icon: SiPython, color: 'text-[#3776AB]' },
  { name: 'Power Automate', Icon: FaMicrosoft, color: 'text-[#00A4EF]' },
] as const

export function Tech() {
  const reduce = useReducedMotion()

  return (
    <Section id="tech" className="border-t border-white/5 px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        {!reduce ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Stack</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tecnologias
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Tecnologias confiáveis para sistemas que crescem com o seu negócio.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stack.map((item, i) => {
            const Icon = item.Icon as IconType
            return (
              <motion.div
                key={item.name}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="group relative flex min-h-[76px] items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                {!reduce ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-130%' }}
                    animate={{ x: ['-130%', '320%'] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                  />
                ) : null}

                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-eden-900/70">
                  <Icon
                    aria-hidden="true"
                    className={`h-7 w-7 ${item.color} transition group-hover:brightness-110`}
                  />
                </span>
                <span className="text-lg font-semibold text-zinc-200">{item.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
