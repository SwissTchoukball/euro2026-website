import type { KirbyQuerySchema } from "#nuxt-kirby";

export const prefetchQuery: KirbyQuerySchema = {
  query: "site",
  select: {
    languages: "kirby.languages",
  },
};
