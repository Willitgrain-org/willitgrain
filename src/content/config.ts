import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string().optional(),
    runtime: z.string().optional(),
    posterUrl: z.string().optional(),
    crewUnitedUrl: z.string().optional(),
    filmfreewayUrl: z.string().optional(),
    trailerUrl: z.string().optional(),
    stills: z.array(z.string()).optional(),
    bts: z.array(z.string()).optional(),
    en: z.object({
      type: z.string().optional(),
      genre: z.string().optional(),
      synopsis: z.string().optional(),
      billingHeader: z.string().optional(),
      billingFooter: z.string().optional(),
    }),
    de: z.object({
      type: z.string().optional(),
      genre: z.string().optional(),
      synopsis: z.string().optional(),
      billingHeader: z.string().optional(),
      billingFooter: z.string().optional(),
    }),
    crewEn: z.array(z.object({
      role: z.string(),
      name: z.string(),
    })).optional(),
    crewDe: z.array(z.object({
      role: z.string(),
      name: z.string(),
    })).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
