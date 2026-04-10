import type { KirbyQuerySchema } from "#nuxt-kirby";

export function getTeamQuery(teamSlug: string, teamTypeSlug: string): KirbyQuerySchema {
  return {
    query: `page("teams/${teamSlug}-${teamTypeSlug}")`,
    select: {
      players: {
        query: `page("teams/${teamSlug}-${teamTypeSlug}").children.listed`,
        select: {
          uuid: "page.uuid",
          firstName: "page.firstName",
          lastName: "page.lastName",
          position: "page.position",
          jerseyNumber: "page.jerseyNumber",
          template: "page.template",
          role: "page.role",
          portrait: {
            query: "page.images",
            select: {
              url: true,
            },
          },
        },
      },
    },
  };
}
