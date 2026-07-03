import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        })
      )
      .default([]),
    date: z.coerce.date(),
    context: z.string().optional(),
    supervisors: z.array(z.string()).default([]),
    mediaNote: z.string().optional(),
    featured: z.boolean().default(false),
    problem: z.array(z.string()).default([]),
    methods: z.array(z.string()).default([]),
    outcome: z.array(z.string()).default([]),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    organization: z.string(),
    role: z.string(),
    type: z.enum(["academic", "industry", "research"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().default(false),
    location: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.string().optional(),
    venue: z.string(),
    year: z.number(),
    type: z.enum(["paper", "talk", "poster", "workshop", "doctoral-consortium", "award"]),
    link: z.string().optional(),
  }),
});

export const collections = { projects, experience, publications };
