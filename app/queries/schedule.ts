import type { KirbyQueryResponse } from "#nuxt-kirby";

export type KirbyScheduleData = {
  days: {
    day: string;
    events: {
      time: string;
      time_clarification: string;
      description: string;
    }[];
  }[];
};

export type KirbyScheduleResponse = KirbyQueryResponse<KirbyScheduleData>;
