import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  slug: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default("Natascha Costa"),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  cluster: z.enum([
    "comparison",
    "pricing",
    "local-seo",
    "advisor-program",
    "recipe",
  ]),
  tags: z.array(z.string()).optional(),
  // translationKey: OPCIONAL. Use a MESMA chave nos posts equivalentes
  // em outros idiomas para o hreflang ligar eles. Deixe em branco se o
  // post for exclusivo deste idioma (ex: post focado em brasileiros nos EUA).
  translationKey: z.string().optional(),
  draft: z.boolean().default(false),
  // focusKeyword: keyword principal NATIVA deste idioma. Para tracking interno.
  focusKeyword: z.string().optional(),
  // targetMarket: mercado-alvo específico (todos nos EUA).
  targetMarket: z.enum(["us-pt", "us-es", "us-en"]).optional(),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
  recipeData: z
    .object({
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
      totalTime: z.string().optional(),
      recipeYield: z.string().optional(),
      recipeCategory: z.string().optional(),
      recipeCuisine: z.string().optional(),
      ingredients: z.array(z.string()).optional(),
      instructions: z.array(z.string()).optional(),
      calories: z.number().optional(),
    })
    .optional(),
});

export const collections = {
  blog_en: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog/en" }),
    schema: blogSchema,
  }),
  blog_es: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog/es" }),
    schema: blogSchema,
  }),
  blog_pt: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog/pt" }),
    schema: blogSchema,
  }),
};
