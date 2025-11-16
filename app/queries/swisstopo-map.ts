import type { KirbyQueryResponse } from "kirby-types";

export type KirbySwisstopoMapData = {
  center: string;
  zoom: number;
};
export type KirbySwisstopoMapResponse = KirbyQueryResponse<KirbySwisstopoMapData>;
