export const tchoukNetSlugIdMapping: {
  competitions: Record<string, { id: string; phases: Record<string, string>; teams: Record<string, string> }>;
  countries: Record<string, string>;
  teamTypes: Record<string, string>;
  fields: Record<string, string>;
} = {
  competitions: {
    women: {
      id: "1f0a5f2f-8deb-610a-aabe-63061465602b",
      phases: {
        "round-robin": "1f10f746-715e-67ac-b5f8-97a42ff9d1c9",
        "semi-finals": "1f10f748-00fa-6504-8543-13875c80ef3e",
        "final3rd-place": "1f10f748-2dc0-6368-ab01-cf4f65ec6eba",
        final: "1f10f748-4c46-6b7a-af2b-658c4bdd87e7",
      },
      teams: {
        "switzerland-a": "1ee77445-df48-66bc-974d-d5bfaf60913b",
        "switzerland-b": "1f14163d-204b-6cd4-9ed3-3bc7f2227f91",
        italy: "1ee77446-f196-69da-8e7f-af10bd10cc85",
        "united-kingdom": "1ef45c93-cb6f-64ae-8266-0134a323160a",
        germany: "1ee77447-6ee8-6708-8b22-a38ded5a3291",
      },
    },
    men: {
      id: "1f0a5f2f-a8e0-6848-9a3f-eb6b37b2816a",
      phases: {
        "round-robin": "1f10f761-477b-694c-b327-a3e51ebaafcf",
        "final5th-place": "1f13445c-ab5a-62de-8992-99d2b783d635",
        "semi-finals": "1f10f761-c3af-68f6-b53c-4334030a34cc",
        "final3rd-place": "1f10f762-3531-66b4-af37-71cc6aa6cac7",
        final: "1f10f762-848d-6bb8-b909-c9970444127d",
      },
      teams: {
        switzerland: "1ee77441-e4c5-63a0-b512-334c0ea67a5e",
        italy: "1ee77444-1c42-6a24-9f4b-b77008012dd6",
        "united-kingdom": "1ef45c99-2cc0-62b2-b84c-85ee861368e5",
        germany: "1ee77445-1cf1-6dca-8d07-735f59cc67f0",
        spain: "1ee77443-0eee-6720-8ca4-a77f08bedd26",
        denmark: "1f10f175-d99b-6d46-bb5e-47b38a41e09a",
        "czech-republic": "1f140794-9d79-6dbc-b1fd-59837f035f19",
      },
    },
    "m18-boys": {
      id: "1f0a5f31-e587-67ae-9d05-e77a0d457c6e",
      phases: {
        "round-robin": "1f134457-7085-65be-9a9a-37dd25f2c17c",
        "semi-finals": "1f134459-7932-6a20-be3c-477ccac2de15",
        "final3rd-place": "1f13445a-1506-6884-88a2-191bff201e51",
        final: "1f13445a-9038-6e8a-91d3-2303c9bed34d",
      },
      teams: {
        "switzerland-a": "1f0a5f48-6e46-64a8-9df7-db263e4f9aab",
        "switzerland-b": "1f10f15e-6df3-6f92-8219-b37f37944f41",
        "czech-republic": "1f131c28-5cad-643a-9283-4b4fd5399a6b",
        italy: "1f0a5f4a-b597-68be-9a43-eb9a93372623",
        "united-kingdom": "1f10f157-69bf-68f6-b2b2-21862f54a804",
      },
    },
    girls: {
      id: "1f0a5f32-1119-6930-8daa-afbb08724b79",
      phases: {},
      teams: {
        "switzerland-m18": "1ee832bf-750c-6a80-b0e8-c90e9ab4fca5",
        "switzerland-m15-bejune": "1f141642-5b4e-68f4-8c31-a158ab8a006d",
        "switzerland-m15-ge": "1f141643-efd0-66de-87c2-a3934d6bf097",
        "poland-m15": "1f13442d-1b3e-67ba-9bfc-d11ab8bed161",
        "united-kingdom-m18": "1f133728-6926-6cd2-87ce-5fddc426291f",
      },
    },
    "m15-boys": {
      id: "1f131c10-9512-68ec-aa60-db2f3ed27b5e",
      phases: {
        "round-robin": "1f134467-51fb-69c6-9598-cf79930ebc2c",
        "semi-finals": "1f134467-7bac-6676-985e-c7db3ec5a0c4",
        "final3rd-place": "1f134467-a3e0-6bf6-b35b-352033b0c3c0",
        final: "1f134467-d7f2-63d6-8f17-eb0c9f5bd0aa",
      },
      teams: {
        "switzerland-ge": "1f131c23-5ec1-6c80-a238-1519de508deb",
        "switzerland-bejune": "1f141658-ce09-6ee6-be9a-ef13144c058c",
        "united-kingdom": "1f131c25-540d-67f6-82d8-533908b87aa1",
        poland: "1f131c25-d878-6248-be60-e1eccba7dc20",
        italy: "1f131c24-7ef3-664c-9599-97dbca60d2cf",
      },
    },
    "m40-men": {
      id: "1f10f179-14fb-697e-8698-81ab971d950e",
      phases: {
        "round-robin": "1f10f446-ddad-6596-8431-35b3e22b8e37",
        "semi-finals": "1f10f70d-7175-685a-b922-b31a35e69d6f",
        "final3rd-place": "1f10f70d-c745-673a-bcc3-a3e5b09a2eb1",
        final: "1f10f70d-fccf-63d8-bbbf-99c66ddc036f",
      },
      teams: {
        switzerland: "1ef45ca7-9f1a-6c50-a381-57f904329d2e",
        italy: "1ef45ca1-8044-66b0-ba1a-67291116c0c5",
        "united-kingdom": "1f10f17b-cd83-64cc-b67e-7bcbb87ff1b2",
        france: "1ef45ca6-8d50-6570-a119-23965875c052",
      },
    },
  },
  countries: {
    switzerland: "4c01c6f8-04de-476b-a5b0-cd06bf9188ca",
    italy: "23a793c3-ee09-4ac9-86cd-6eecbaa4518f",
    "united-kingdom": "bbc9df2b-6f38-4524-a8f7-d3fc6d78306a",
    germany: "0b989d11-c00d-4e8d-bac9-dd9e130559c0",
    france: "262878ad-f5f6-463e-ae1a-28a44fa0b3d4",
    spain: "ed5b3058-67a6-48f1-b799-53d1a390a582",
    poland: "61f87a3e-8438-4564-8850-c1a6a73cca82",
    denmark: "e6d275e2-9f9b-49d1-bd0a-5476f3edb71a",
  },
  teamTypes: {
    women: "e0b97c58-92a5-42c5-b2d2-c8b8b20f37ae",
    men: "2645efc6-c69e-45b4-8641-f91f3a3c51e3",
    "m18-boys": "6182e133-2bbe-4f2a-a0ab-8de9f1559de2",
    "m18-girls": "6525e7e1-2025-407f-a9fa-6fc0fa69a6f0",
    "m15-boys": "8d8e6a07-4189-4ddc-b4d7-32094b4d8244",
    "m15-girls": "800585a1-e7b8-4fa6-ac69-1c3f2925c61b",
    "m40-men": "721c4b11-0a45-4451-aade-4ebfbead3f4a",
  },
  fields: {
    "sport-toto-hall": "1f10fe55-a4e3-6120-8a85-ed1887cbefd5",
    "old-sports-hall": "1f10fe56-81c0-614c-bd63-491f7beb3e0b",
  },
};

export function getCompetitionSlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const competition = Object.entries(tchoukNetSlugIdMapping.competitions).find(([_slug, c]) => c.id === id);
  return competition?.[0];
}

export function getCountrySlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const country = Object.entries(tchoukNetSlugIdMapping.countries).find(([_slug, c]) => c === id);
  return country?.[0];
}

export function getFieldSlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const field = Object.entries(tchoukNetSlugIdMapping.fields).find(([_slug, c]) => c === id);
  return field?.[0];
}

export function getTeamTypeSlugFromId(id: string | undefined): string | undefined {
  if (!id) {
    return;
  }
  const teamType = Object.entries(tchoukNetSlugIdMapping.teamTypes).find(([_slug, c]) => c === id);
  return teamType?.[0];
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
