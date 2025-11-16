import type { KirbyQueryResponse } from "kirby-types";

export type KirbyDeadlinesData = {
  deadlines: {
    date: string;
    description: string;
    clarification: string;
  }[];
};

export type KirbyDeadlinesResponse = KirbyQueryResponse<KirbyDeadlinesData>;
