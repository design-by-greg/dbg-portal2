export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { montant, reference } = req.body;

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'eur',
      'line_items[0][price_data][product_data][name]': 'Commande ' + reference + ' — Design by Greg',
      'line_items[0][price_data][unit_amount]': Math.round(montant * 100),
      'line_items[0][quantity]': '1',
      'mode': 'payment',
      'success_url': process.env.PORTAL_URL + '?paiement=ok',
      'cancel_url': process.env.PORTAL_URL
    })
  });

  const session = await response.json();
  if (session.url) {
    res.status(200).json({ url: session.url });
  } else {
    res.status(500).json({ error: session.error?.message || 'Erreur Stripe' });
  }
}
