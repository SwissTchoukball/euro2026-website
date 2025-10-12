export const tchoukNetSlugIdMapping: {
  competitions: Record<string, { id: string; phases: Record<string, string>; teams: Record<string, string> }>;
  countries: Record<string, string>;
} = {
  competitions: {
    // TGI 2023
    "nations-cup-women": {
      id: "eae2638a-d683-49df-82f5-5735df3cce0e",
      phases: {
        "group-a": "1ee8245a-a0a5-60a2-be7f-cb740faa6650",
        "group-b": "1ee8245a-f189-6e32-a53e-61bb5500ba78",
        "quarter-final": "1ee8247f-769c-68c6-a0ef-09a39a30b20f",
        "semi-final": "1ee82487-d377-61c4-adaf-4140a4d3eab8",
        "final3rd-place": "1ee82489-9923-6e12-bd99-bd5209944daf",
        "final1st-place": "1ee82489-ee0e-64d6-bfaf-633369599e5f",
        "ranking5th7th-place": "1ee82484-9c8c-6d56-8da2-b74a11dfb316",
      },
      teams: {
        switzerland: "1ee77445-df48-66bc-974d-d5bfaf60913b",
        "italy-a": "1ee77446-f196-69da-8e7f-af10bd10cc85",
        "italy-b": "1ee77447-1437-6840-84f4-e5c50149a173",
        "switzerland-m18": "1ee832bf-750c-6a80-b0e8-c90e9ab4fca5",
        france: "1ee832c0-b8bc-6630-b7b5-312752b69ffd",
        germany: "1ee77447-6ee8-6708-8b22-a38ded5a3291",
        poland: "1ee77446-2c47-679c-8a0e-edebfac3a285",
      },
    },
    "nations-cup-men": {
      id: "61c83cea-84be-4d1a-aa6a-7d9094b5c457",
      phases: {},
      teams: {},
    },
    "nations-cup-u18": {
      id: "1ee79820-077e-684a-b43e-efa60d1549ce",
      phases: {},
      teams: {},
    },
    // Ferrara 2024
    "2024-women": {
      id: "1ef411c6-d69f-6db4-a7c5-f55a299ea832",
      phases: {
        qualifications: "1ef4a08b-1040-6a84-9bb3-75943b3cc9c0",
        "final5th-place": "1ef4a08c-44a0-60d0-8bb7-09c55af501e4",
        "semi-finals": "1ef4a08c-941a-6fb6-9fa4-c590bc489c85",
        "final3rd-place": "1ef4a08d-2286-6854-9509-aba835a5c2a6",
        final: "1ef4a08d-6ca0-6f66-9fbd-1b937dec8ed2",
      },
      teams: {},
    },
    "2024-men": {
      id: "1ef411c6-f976-64c8-8676-4b98f03aa015",
      phases: {
        qualifications: "1ef49cb6-5287-6a10-add9-e397c5a8495a",
        "final5th-place": "1ef49d03-c0cc-6b04-ad1c-41ca8c8188ce",
        "semi-finals": "1ef49d0a-5ddc-6d4e-b431-331faeea473f",
        "final3rd-place": "1ef49d0c-e7e6-6664-bb69-dd269dd2a4e5",
        final: "1ef49d0d-14d3-628a-a021-bfb27d9a28a0",
      },
      teams: {
        switzerland: "1ee77441-e4c5-63a0-b512-334c0ea67a5e",
        "united-kingdom": "1ef45c99-2cc0-62b2-b84c-85ee861368e5",
        germany: "1ee77445-1cf1-6dca-8d07-735f59cc67f0",
        "italy-a": "1ee77444-1c42-6a24-9f4b-b77008012dd6",
        "italy-b": "1ee77444-41fb-64fa-bc09-c15b5b2613cc",
        spain: "1ee77443-0eee-6720-8ca4-a77f08bedd26",
      },
    },
    "2024-o40": {
      id: "1ef411c5-9e4d-6f5c-b418-2361c26a7c4a",
      phases: {},
      teams: {},
    },
  },
  countries: {
    switzerland: "4c01c6f8-04de-476b-a5b0-cd06bf9188ca",
    italy: "23a793c3-ee09-4ac9-86cd-6eecbaa4518f",
    "united-kingdom": "?uk",
    germany: "0b989d11-c00d-4e8d-bac9-dd9e130559c0",
    france: "262878ad-f5f6-463e-ae1a-28a44fa0b3d4",
    spain: "?es",
    poland: "61f87a3e-8438-4564-8850-c1a6a73cca82",
  },
};

export function getCompetitionSlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const competition = Object.entries(tchoukNetSlugIdMapping.competitions).find(([slug, c]) => c.id === id);
  return competition?.[0];
}

export function getCountrySlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const country = Object.entries(tchoukNetSlugIdMapping.countries).find(([slug, c]) => c === id);
  return country?.[0];
}

export function getSlugFromId(
  id: string | undefined,
  competitionSlug: string,
  dataType: "phases" | "teams"
): string | undefined {
  if (!id || !competitionSlug) {
    return;
  }
  // const competition = Object.values(tchoukNetSlugIdMapping.competitions).find((c) => c.id === competitionId);
  const competition = tchoukNetSlugIdMapping.competitions[competitionSlug];
  if (!competition?.[dataType]) {
    return;
  }
  for (const [slug, mappedId] of Object.entries(competition[dataType])) {
    if (mappedId === id) {
      return slug;
    }
  }
}
