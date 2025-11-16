import type { KirbyQueryResponse } from "kirby-types";

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
