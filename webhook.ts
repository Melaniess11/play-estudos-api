export default async function handler(req, res) {
  const SECRET = 'minha-chave-secreta'

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.headers.authorization
  if (token !== SECRET) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const { event, data } = req.body

  console.log('📥 Webhook recebido:', event)

  if (event === 'subscription.created' || event === 'subscription.renewed') {
    console.log(`✅ Assinatura ATIVADA para: ${data.email}`)
  }

  if (event === 'subscription.canceled') {
    console.log(`🚫 Assinatura CANCELADA para: ${data.email}`)
  }

  res.status(200).json({ ok: true })
}
