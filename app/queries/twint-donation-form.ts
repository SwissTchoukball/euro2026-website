import type { KirbyQueryResponse } from "kirby-types";

export type KirbyTwintDonationFormData = {
  key: string;
};
export type KirbyTwintDonationFormResponse = KirbyQueryResponse<KirbyTwintDonationFormData>;
