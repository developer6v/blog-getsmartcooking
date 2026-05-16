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
  translationKey: z.string(),
  draft: z.boolean().default(false),
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
