export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  // Verifica se as chaves estão configuradas
  const publicKey = context.env.SIGILO_PUBLIC;
  const secretKey = context.env.SIGILO_SECRET;

  if (!publicKey || !secretKey) {
    return new Response(JSON.stringify({
      sucesso: false,
      erro: 'Variáveis de ambiente não configuradas. Configure SIGILO_PUBLIC e SIGILO_SECRET no Cloudflare Pages.',
      debug: {
        SIGILO_PUBLIC: publicKey ? 'OK' : 'AUSENTE',
        SIGILO_SECRET: secretKey ? 'OK' : 'AUSENTE',
      }
    }), { status: 500, headers: corsHeaders });
  }

  try {
    const body = await context.request.json();

    const response = await fetch('https://app.sigilopay.com.br/api/v1/gateway/pix/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': publicKey,
        'x-secret-key': secretKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: corsHeaders,
    });

  } catch (err) {
    return new Response(JSON.stringify({ sucesso: false, erro: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
