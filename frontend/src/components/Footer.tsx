import { FaEnvelope, FaLinkedinIn } from 'react-icons/fa6'
import { SiWhatsapp } from 'react-icons/si'
import { EMAIL, LINKEDIN_URL, whatsappHref } from '../lib/links'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-eden-900/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center">
            <img
              src="/brand/logo-horizontal.svg"
              alt="Eden System"
              className="h-10 w-auto max-w-[240px] opacity-95"
            />
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
            Tecnologia sob medida para crescimento real. Processos organizados, automatizados e
            prontos para escalar.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-600">Contato</span>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              title={EMAIL}
              aria-label={`Enviar e-mail para ${EMAIL}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 shadow-sm transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <FaEnvelope aria-hidden className="h-[18px] w-[18px]" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar no WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition hover:brightness-110 hover:shadow-[#25D366]/45"
            >
              <SiWhatsapp aria-hidden className="h-[22px] w-[22px]" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Eden System no LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-lg shadow-[#0A66C2]/30 transition hover:brightness-110 hover:shadow-[#0A66C2]/40"
            >
              <FaLinkedinIn aria-hidden className="h-[22px] w-[22px]" />
            </a>
          </div>
          <p className="text-xs text-zinc-600">{EMAIL}</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Eden System. Todos os direitos reservados.
      </div>
    </footer>
  )
}
