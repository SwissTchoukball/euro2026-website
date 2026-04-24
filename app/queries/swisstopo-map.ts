import type { KirbyQueryResponse } from "#nuxt-kirby";

export type KirbySwisstopoMapData = {
  center: string;
  zoom: number;
  layers: string;
};
export type KirbySwisstopoMapResponse = KirbyQueryResponse<KirbySwisstopoMapData>;
