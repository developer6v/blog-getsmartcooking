# Blog do getsmartcooking.com — Setup Completo

Estrutura de arquivos pronta para o blog multilíngue (EN/ES/PT) em Astro + TinaCMS + Cloudflare Pages.

## Stack

- **Framework**: Astro 5 (SSG)
- **CMS**: TinaCMS (edição visual + commit no Git)
- **Host**: Cloudflare Pages
- **Conteúdo**: MDX no repositório, organizado por idioma
- **Idiomas**: EN, ES, PT (directory-based localization)

## Passo a passo de instalação

### 1. Pré-requisitos

No projeto Astro atual do getsmartcooking.com, garanta que está rodando Astro 5+. Se ainda não tiver:

```bash
npm install astro@latest
```

Instale as integrações necessárias:

```bash
npm install @astrojs/mdx @astrojs/sitemap
npm install -D @tinacms/cli tinacms
```

### 2. Copiar os arquivos

Copie os arquivos desta pasta para a raiz do seu projeto, mantendo a estrutura:

```
seu-projeto/
├── astro.config.mjs        ← substituir
├── tina/
│   └── config.ts            ← novo
├── src/
│   ├── content.config.ts    ← novo (ou mesclar com existente)
│   ├── components/
│   │   ├── seo/             ← nova pasta
│   │   ├── CTAWhatsApp.astro
│   │   ├── RelatedPosts.astro
│   │   └── FAQ.astro
│   ├── layouts/
│   │   ├── BlogPost.astro
│   │   └── BlogList.astro
│   ├── pages/[lang]/blog/   ← novas rotas
│   ├── content/blog/        ← onde ficam os posts MDX
│   └── lib/
│       ├── i18n.ts
│       └── utils.ts
└── public/
    └── robots.txt           ← atualizar
```

### 3. Atualizar package.json

Adicione os scripts:

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build",
    "preview": "astro preview"
  }
}
```

### 4. Rodar localmente

```bash
npm run dev
```

Acesse:
- Site: `http://localhost:4321/`
- TinaCMS admin: `http://localhost:4321/admin/index.html`

### 5. Configurar TinaCMS Cloud

1. Acesse https://app.tina.io/signup
2. Crie um projeto novo apontando para o repositório GitHub
3. Pegue o `clientId` e `token` que aparecem
4. Adicione no Cloudflare Pages como variáveis de ambiente:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
5. Configure o branch de produção (geralmente `main`)

### 6. Deploy no Cloudflare Pages

No dashboard do Cloudflare Pages:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 20 ou superior (env var `NODE_VERSION=20`)
- **Variáveis de ambiente**: as do passo 5

### 7. Submeter sitemap

Após o primeiro deploy:
- Google Search Console: `https://getsmartcooking.com/sitemap-index.xml`
- Bing Webmaster Tools: mesmo URL

## Estrutura de um post

Cada post é um arquivo MDX em `src/content/blog/[idioma]/[slug].mdx`:

```mdx
---
title: "Thermomix vs Vitamix: qual vale mais a pena?"
description: "Comparação direta entre Thermomix e Vitamix..."
slug: "thermomix-vs-vitamix"
publishDate: 2026-05-16
updatedDate: 2026-05-16
author: "Natascha Costa"
heroImage: "/uploads/thermomix-vs-vitamix.jpg"
heroImageAlt: "Thermomix TM7 ao lado de Vitamix"
cluster: "comparison"
tags: ["thermomix", "vitamix", "comparação"]
translationKey: "thermomix-vs-vitamix"
language: "pt"
draft: false
faq:
  - question: "Thermomix substitui o Vitamix?"
    answer: "Sim, e faz mais..."
---

import CTAWhatsApp from '~/components/CTAWhatsApp.astro';

Texto do post aqui...

<CTAWhatsApp variant="inline" message="Quer ver a diferença ao vivo?" />

Mais texto...

<CTAWhatsApp variant="banner" />
```

## Os 3 idiomas do mesmo post

Para criar o "Thermomix vs Vitamix" nas 3 línguas, crie 3 arquivos:
- `src/content/blog/pt/thermomix-vs-vitamix.mdx`
- `src/content/blog/es/thermomix-vs-vitamix.mdx`
- `src/content/blog/en/thermomix-vs-vitamix.mdx`

Os 3 compartilham `translationKey: "thermomix-vs-vitamix"`. O sistema gera o hreflang automaticamente.

## Próximos passos depois da instalação

1. Validar que tudo compila e o TinaCMS abre o admin
2. Criar primeiro post de teste em português
3. Configurar Tina Cloud
4. Primeiro deploy no Cloudflare
5. Definir calendário editorial dos primeiros 10 posts
6. Treinar Natascha no TinaCMS (15 minutos é suficiente)

## Suporte

Documentação oficial:
- Astro: https://docs.astro.build
- TinaCMS: https://tina.io/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
