import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const CLUSTERS = [
  { value: "comparison", label: "Comparação (vs concorrentes)" },
  { value: "pricing", label: "Preço e financiamento" },
  { value: "local-seo", label: "SEO local (Texas, Houston, etc)" },
  { value: "advisor-program", label: "Programa de Advisor" },
  { value: "recipe", label: "Receita Thermomix" },
];

const TARGET_MARKETS = [
  { value: "us-pt", label: "EUA - Português (brasileiros imigrantes)" },
  { value: "us-es", label: "EUA - Espanhol (hispanos)" },
  { value: "us-en", label: "EUA - Inglês (americanos nativos)" },
];

const CTA_TEMPLATES = [
  {
    name: "CTAWhatsAppInline",
    label: "CTA WhatsApp (inline)",
    fields: [
      {
        name: "message",
        label: "Mensagem do CTA",
        type: "string" as const,
      },
    ],
  },
  {
    name: "CTAWhatsAppBanner",
    label: "CTA WhatsApp (banner)",
    fields: [
      {
        name: "headline",
        label: "Título",
        type: "string" as const,
      },
      {
        name: "subtext",
        label: "Subtítulo",
        type: "string" as const,
      },
    ],
  },
  {
    name: "CTAWhatsAppFinal",
    label: "CTA WhatsApp (fim do post)",
    fields: [
      {
        name: "headline",
        label: "Título",
        type: "string" as const,
      },
    ],
  },
];

const buildBlogCollection = (
  locale: "en" | "es" | "pt",
  defaultMarket: "us-en" | "us-es" | "us-pt"
) => ({
  name: `blog_${locale}`,
  label: `Blog ${locale.toUpperCase()}`,
  path: `src/content/blog/${locale}`,
  format: "mdx" as const,
  ui: {
    router: ({ document }: { document: { _sys: { filename: string } } }) =>
      `/blog/${locale}/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Meta description (SEO)",
      required: true,
      ui: {
        component: "textarea",
        description: "Aparece no Google. Máximo 160 caracteres.",
      },
    },
    {
      type: "string",
      name: "slug",
      label: "Slug (URL)",
      required: true,
      description:
        "Use a keyword NATIVA deste idioma. Ex (PT): thermomix-vale-a-pena-nos-eua. Sem espaços, sem acentos.",
    },
    {
      type: "string",
      name: "focusKeyword",
      label: "Keyword foco (interno)",
      description:
        "A keyword principal que este post está atacando neste idioma. Para tracking. Ex: 'thermomix vale a pena nos estados unidos'",
    },
    {
      type: "string",
      name: "targetMarket",
      label: "Mercado-alvo",
      options: TARGET_MARKETS,
      ui: {
        defaultItem: defaultMarket,
      },
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Data de publicação",
      required: true,
    },
    {
      type: "datetime",
      name: "updatedDate",
      label: "Data da última atualização",
    },
    {
      type: "string",
      name: "author",
      label: "Autor",
      required: true,
      ui: {
        defaultItem: "Natascha Costa",
      },
    },
    {
      type: "image",
      name: "heroImage",
      label: "Imagem de capa",
      required: true,
    },
    {
      type: "string",
      name: "heroImageAlt",
      label: "Texto alternativo da imagem",
      required: true,
      description: "Descrição da imagem para SEO e acessibilidade.",
    },
    {
      type: "string",
      name: "cluster",
      label: "Cluster temático",
      required: true,
      options: CLUSTERS,
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
    {
      type: "string",
      name: "translationKey",
      label: "Chave de equivalência entre idiomas (hreflang)",
      description:
        "OPCIONAL. Use a MESMA chave nos posts equivalentes em outros idiomas (ex: 'thermomix-vs-vitamix'). Deixe em branco se este post for exclusivo deste idioma (ex: post para brasileiros nos EUA sem equivalente em outros idiomas).",
    },
    {
      type: "boolean",
      name: "draft",
      label: "Rascunho",
      description: "Marque para esconder do site em produção.",
    },
    {
      type: "object",
      name: "faq",
      label: "FAQ (perguntas e respostas)",
      description:
        "Aparecem como rich result no Google. Use perguntas REAIS que pessoas deste idioma fazem (do AlsoAsked, fóruns, etc).",
      list: true,
      ui: {
        itemProps: (item: { question?: string }) => ({
          label: item?.question || "Nova pergunta",
        }),
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Pergunta",
        },
        {
          type: "string",
          name: "answer",
          label: "Resposta",
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "object",
      name: "recipeData",
      label: "Dados da receita (apenas para cluster 'recipe')",
      fields: [
        { type: "string", name: "prepTime", label: "Tempo de preparo (ex: PT15M)" },
        { type: "string", name: "cookTime", label: "Tempo de cozimento (ex: PT30M)" },
        { type: "string", name: "totalTime", label: "Tempo total (ex: PT45M)" },
        { type: "string", name: "recipeYield", label: "Rendimento (ex: 4 porções)" },
        { type: "string", name: "recipeCategory", label: "Categoria (ex: Sobremesa)" },
        { type: "string", name: "recipeCuisine", label: "Culinária (ex: Italiana)" },
        {
          type: "string",
          name: "ingredients",
          label: "Ingredientes",
          list: true,
        },
        {
          type: "string",
          name: "instructions",
          label: "Modo de preparo (passo a passo)",
          list: true,
          ui: { component: "textarea" },
        },
        { type: "number", name: "calories", label: "Calorias por porção" },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conteúdo do post",
      isBody: true,
      templates: CTA_TEMPLATES,
    },
  ],
});

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      buildBlogCollection("pt", "us-pt"),
      buildBlogCollection("es", "us-es"),
      buildBlogCollection("en", "us-en"),
    ],
  },

  ...(process.env.TINA_SEARCH_TOKEN && {
    search: {
      tina: {
        indexerToken: process.env.TINA_SEARCH_TOKEN,
        stopwordLanguages: ["por", "spa", "eng"],
      },
      indexBatchSize: 100,
      maxSearchIndexFieldLength: 100,
    },
  }),
});
