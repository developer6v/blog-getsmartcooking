import { getCollection } from "astro:content";

export type Locale = "en" | "es" | "pt";

export const LOCALES: Locale[] = ["en", "es", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

export const LOCALE_ROUTES: Record<Locale, string> = {
  en: "/en/",
  es: "/es/",
  pt: "/pt/",
};

/**
 * Busca todos os posts de um idioma específico, ignorando rascunhos.
 */
export async function getPostsByLocale(locale: Locale) {
  const collectionName = `blog_${locale}` as const;
  const posts = await getCollection(collectionName, ({ data }) => !data.draft);
  return posts.sort(
    (a, b) =>
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime()
  );
}

/**
 * Para um post específico, busca as versões equivalentes em outros idiomas
 * usando translationKey como chave de ligação.
 *
 * Importante: posts NATIVOS de um idioma (sem equivalente em outros)
 * não precisam de translationKey. Esta função retorna objeto vazio
 * nesse caso, o que é correto.
 */
export async function getAlternateLanguages(
  translationKey: string | undefined,
  currentLocale: Locale
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  // Post exclusivo deste idioma. Não tem equivalentes.
  if (!translationKey) {
    return result;
  }

  for (const locale of LOCALES) {
    if (locale === currentLocale) continue;
    const collectionName = `blog_${locale}` as const;
    const posts = await getCollection(
      collectionName,
      ({ data }) =>
        data.translationKey === translationKey && !data.draft
    );
    if (posts.length > 0) {
      result[locale] = `/blog/${locale}/${posts[0].data.slug}/`;
    }
  }

  return result;
}

/**
 * Retorna posts filtrados por cluster e idioma.
 */
export async function getPostsByCluster(cluster: string, locale: Locale) {
  const posts = await getPostsByLocale(locale);
  return posts.filter((post) => post.data.cluster === cluster);
}

/**
 * Retorna posts filtrados por target market.
 * Útil para landing pages específicas (ex: "Conteúdo para brasileiras nos EUA").
 */
export async function getPostsByMarket(
  market: "us-pt" | "us-es" | "us-en",
  locale: Locale
) {
  const posts = await getPostsByLocale(locale);
  return posts.filter((post) => post.data.targetMarket === market);
}

export const CLUSTER_LABELS: Record<string, Record<Locale, string>> = {
  comparison: {
    en: "Comparisons",
    es: "Comparaciones",
    pt: "Comparações",
  },
  pricing: {
    en: "Pricing & Financing",
    es: "Precio y Financiación",
    pt: "Preço e Financiamento",
  },
  "local-seo": {
    en: "Texas & Local",
    es: "Texas y Local",
    pt: "Texas e Local",
  },
  "advisor-program": {
    en: "Advisor Program",
    es: "Programa de Advisor",
    pt: "Programa de Advisor",
  },
  recipe: {
    en: "Recipes",
    es: "Recetas",
    pt: "Receitas",
  },
};
