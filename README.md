# Blog do getsmartcooking.com — Setup Completo

Estrutura de arquivos pronta para o blog multilíngue (EN/ES/PT) em Astro + TinaCMS + Cloudflare Pages.

## Estratégia de conteúdo

**Posts são NATIVOS de cada idioma, não traduções.**

Cada idioma ataca seu próprio mercado nos EUA:
- **PT (us-pt)**: brasileiras que migraram para os EUA
- **ES (us-es)**: hispanos nos EUA (nativos ou imigrantes)
- **EN (us-en)**: americanas nativas

Posts equivalentes em idiomas diferentes compartilham um `translationKey`
(para hreflang funcionar), mas o conteúdo é escrito do zero em cada idioma,
com keyword research nativa, exemplos culturais relevantes e tom local.

Posts que só fazem sentido em um idioma (ex: "Thermomix para brasileiras no Texas")
ficam sem `translationKey`. Isso é correto e suportado pelo sistema.

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
├── astro.config.mjs        ← substituir (ou mesclar com existente)
├── tsconfig.json            ← mesclar (alias ~/* é crítico)
├── tina/
│   └── config.ts            ← novo
├── src/
│   ├── content.config.ts    ← novo (ou mesclar)
│   ├── components/
│   │   ├── seo/             ← nova pasta com 5 schemas JSON-LD
│   │   ├── CTAWhatsApp.astro
│   │   ├── RelatedPosts.astro
│   │   └── FAQ.astro
│   ├── layouts/
│   │   ├── BlogPost.astro
│   │   └── BlogList.astro
│   ├── pages/[lang]/blog/   ← rotas novas (não conflita com /[lang]/index.astro)
│   ├── content/blog/        ← posts MDX organizados por idioma
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
- Blog PT: `http://localhost:4321/pt/blog/`
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
- Google Search Console: verificar domínio inteiro (`getsmartcooking.com`) via DNS
- Submeter sitemap: `https://getsmartcooking.com/sitemap-index.xml`
- Bing Webmaster Tools: mesmo URL (alimenta ChatGPT, Copilot, Perplexity)

## Estrutura de um post

Cada post é um arquivo MDX em `src/content/blog/[idioma]/[slug].mdx`.

**Importante**: o slug usa a keyword NATIVA do idioma, não tradução do inglês.

### Exemplo PT (para brasileiras nos EUA):

```mdx
---
title: "Thermomix vale a pena nos Estados Unidos? Uma brasileira responde"
description: "Sou brasileira, moro no Texas..."
slug: "thermomix-vale-a-pena-nos-estados-unidos"
focusKeyword: "thermomix vale a pena nos estados unidos"
targetMarket: "us-pt"
publishDate: 2026-05-16
author: "Natascha Costa"
heroImage: "/uploads/foto.jpg"
heroImageAlt: "Descrição da foto"
cluster: "pricing"
tags: ["thermomix", "brasileiras nos eua"]
translationKey: "thermomix-worth-it-usa"  # opcional
---

import CTAWhatsApp from '~/components/CTAWhatsApp.astro';

Conteúdo nativo em PT...

<CTAWhatsApp variant="inline" message="..." locale="pt" />
```

### Exemplo EN (para americanas nativas):

```mdx
---
title: "Is the Thermomix worth it in 2026? An honest USA review"
description: "After 2 years using Thermomix daily..."
slug: "is-thermomix-worth-it-usa"
focusKeyword: "is thermomix worth it"
targetMarket: "us-en"
publishDate: 2026-05-16
author: "Natascha Costa"
heroImage: "/uploads/foto-en.jpg"
heroImageAlt: "Description"
cluster: "pricing"
tags: ["thermomix", "review", "worth it"]
translationKey: "thermomix-worth-it-usa"  # MESMA chave do post PT
---

Conteúdo nativo em EN, atacando keywords diferentes do post PT...
```

Os dois posts compartilham `translationKey: "thermomix-worth-it-usa"`, então
o hreflang vai ligar eles automaticamente. Mas o conteúdo, slug, keyword foco
e até as FAQs são totalmente diferentes, cada um otimizado para seu mercado.

## Workflow recomendado de produção

1. **Pesquisa de keywords** por idioma (Ahrefs/SEMrush filtrado por país+idioma)
2. **Brief separado** por idioma com keyword foco, intent, perguntas reais
3. **IA gera draft NATIVO** em cada idioma (prompts separados, não tradução)
4. **Natascha revisa** cada draft (esse passo é não negociável para SEO)
5. **Publica via TinaCMS** com translationKey igual quando há equivalência
6. **Monitora GSC** por country e por language section

## Próximos passos depois da instalação

1. Validar que tudo compila e o TinaCMS abre o admin
2. O post de exemplo em PT já está incluso, ver `/pt/blog/thermomix-vale-a-pena-nos-estados-unidos/`
3. Configurar Tina Cloud
4. Primeiro deploy no Cloudflare
5. Iniciar keyword research em PT/ES/EN para primeiros 10 posts
6. Treinar Natascha no TinaCMS (15 minutos é suficiente)

## Suporte

Documentação oficial:
- Astro: https://docs.astro.build
- TinaCMS: https://tina.io/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
