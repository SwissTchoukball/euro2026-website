import type { KirbyQueryResponse } from "kirby-types";

export type KirbySwisstopoMapData = {
  center: string;
  zoom: number;
  layers: string;
};
export type KirbySwisstopoMapResponse = KirbyQueryResponse<KirbySwisstopoMapData>;
