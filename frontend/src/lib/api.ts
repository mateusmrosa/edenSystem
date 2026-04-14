const apiBase = import.meta.env.VITE_API_URL ?? ''

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
  company?: string
  form_started_at: number
  recaptcha_token?: string
}

export async function submitContact(payload: ContactPayload): Promise<{ message: string }> {
  const res = await fetch(`${apiBase}/api/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => ({}))) as {
    message?: string
    errors?: Record<string, string[]>
  }

  if (!res.ok) {
    const fromFields = data.errors && Object.values(data.errors).flat()[0]
    const msg = fromFields || data.message || 'Não foi possível enviar. Tente novamente.'
    throw new Error(msg)
  }

  if (!data.message) {
    throw new Error('Resposta inválida do servidor.')
  }

  return { message: data.message }
}
