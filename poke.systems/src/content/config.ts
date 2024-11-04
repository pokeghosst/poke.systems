import { z, defineCollection } from "astro:content";

const poemCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  poems: poemCollection,
};
