/**
 * Formata data no padrão local de cada idioma.
 */
export function formatDate(date: Date, locale: "en" | "es" | "pt"): string {
  const localeMap = {
    en: "en-US",
    es: "es-US",
    pt: "pt-BR",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Calcula tempo estimado de leitura em minutos.
 */
export function readingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Trunca texto para um número específico de caracteres.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
