# Fagner - Vivo Rio | Ticket360

## Estrutura de arquivos

```
/
├── index.html              ← Site principal
├── functions/
│   └── api/
│       └── pix.js          ← Cloudflare Pages Function (PIX)
└── README.md
```

## Deploy no Cloudflare Pages

1. Suba esta pasta para um repositório GitHub
2. No Cloudflare Pages: **Create a project → Connect to Git**
3. Selecione o repositório
4. Em **Build settings**: deixe tudo em branco
5. Clique em **Deploy**

## Variáveis de Ambiente (OBRIGATÓRIO para o PIX funcionar)

No Cloudflare Pages → Settings → Environment variables, adicione:

| Nome | Valor |
|------|-------|
| `SIGILO_PUBLIC` | sua chave pública da SigiloPay |
| `SIGILO_SECRET` | sua chave secreta da SigiloPay |

## Como funciona o PIX

- O site chama `/api/pix` (POST)
- O Cloudflare executa `functions/api/pix.js`
- O arquivo faz a ponte com a API da SigiloPay
- As chaves ficam seguras nas variáveis de ambiente (nunca expostas no HTML)

## Endpoint SigiloPay

`https://app.sigilopay.com.br/api/v1/gateway/pix/receive`
