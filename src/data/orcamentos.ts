export type OrcamentoSection = {
  title: string
  items: string[]
}

export type OrcamentoPackage = {
  label: string
  title: string
  price: string
  priceNote?: string
  sections: OrcamentoSection[]
  notes?: string[]
}

export type OrcamentoProposal = {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  whatsappMessage: string
  packages: OrcamentoPackage[]
}

export const orcamentos: Record<string, OrcamentoProposal> = {
  dermatojulianacarvalho: {
    slug: 'dermatojulianacarvalho',
    eyebrow: 'Orçamento',
    title: 'Sistema de Ativação Gamificada Summer Club',
    subtitle: 'Proposta com duas opções de implementação para campanha promocional',
    whatsappMessage:
      'Olá! Recebi o orçamento do sistema de gamificação para a Dermato Juliana Carvalho e gostaria de conversar sobre as opções.',
    packages: [
      {
        label: 'Opção 1',
        title: 'Sistema Completo (Gamificação + Painel Administrativo)',
        price: 'R$ 3.000,00',
        sections: [
          {
            title: 'Sistema da Roleta',
            items: [
              'Tela inicial para identificação do participante (Nome e CPF)',
              'Validação de participação',
              'Controle de giros disponíveis',
              'Animação da roleta',
              'Sistema de premiação por categorias',
              'Controle automático das probabilidades',
              'Controle automático do estoque dos prêmios',
              'Remoção automática de prêmios esgotados',
              'Registro de todos os giros realizados',
            ],
          },
          {
            title: 'Painel Administrativo',
            items: [
              'Login administrativo',
              'Cadastro e consulta de participantes',
              'Liberação de giros por participante',
              'Cadastro e gerenciamento dos prêmios',
              'Controle de estoque',
              'Visualização dos ganhadores',
              'Ajustes das configurações da campanha',
            ],
          },
          {
            title: 'Banco de Dados',
            items: [
              'Cadastro de participantes',
              'Cadastro dos prêmios',
              'Histórico completo de premiações',
              'Persistência de todos os dados durante o período da campanha',
            ],
          },
        ],
      },
      {
        label: 'Opção 2',
        title: 'Sistema de Gamificação (Versão MVP)',
        price: 'R$ 2.000,00',
        sections: [
          {
            title: 'Incluso',
            items: [
              'Tela inicial para identificação do participante (Nome e CPF)',
              'Validação dos participantes previamente cadastrados',
              'Controle de giros disponíveis',
              'Animação da roleta',
              'Sistema de premiação por categorias',
              'Controle automático das probabilidades',
              'Controle automático do estoque dos prêmios',
              'Registro dos giros realizados',
            ],
          },
        ],
        notes: [
          'Nesta versão não haverá painel administrativo.',
          'Antes do início da campanha, a clínica fornecerá todas as informações necessárias para o funcionamento do sistema, como: lista de participantes (nome e CPF), quantidade de giros de cada participante, relação dos prêmios, quantidade disponível de cada prêmio e configurações da campanha.',
          'Todas essas informações serão previamente cadastradas no sistema, deixando-o pronto para utilização durante o período do evento.',
          'Caso seja necessário ampliar a solução futuramente, será possível desenvolver um painel administrativo em uma nova etapa.',
        ],
      },
    ],
  },
}

export function getOrcamento(slug: string): OrcamentoProposal | undefined {
  return orcamentos[slug]
}
