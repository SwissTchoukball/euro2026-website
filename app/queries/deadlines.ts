import type { KirbyQueryResponse } from "#nuxt-kirby";

export type KirbyDeadlinesData = {
  deadlines: {
    date: string;
    description: string;
    clarification: string;
  }[];
};

export type KirbyDeadlinesResponse = KirbyQueryResponse<KirbyDeadlinesData>;
