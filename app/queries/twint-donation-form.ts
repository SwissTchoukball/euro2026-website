import type { KirbyQueryResponse } from "#nuxt-kirby";

export type KirbyTwintDonationFormData = {
  key: string;
};
export type KirbyTwintDonationFormResponse = KirbyQueryResponse<KirbyTwintDonationFormData>;
