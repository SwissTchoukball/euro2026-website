<template>
  <table class="l-table l-table--styled l-table--centred kb-deadlines">
    <tbody>
      <tr v-for="deadline in block.content.deadlines" :key="deadline.date">
        <td>
          {{
            Intl.DateTimeFormat(`${locale}-CH`, {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/Zurich",
            }).format(new Date(deadline.date))
          }}
        </td>
        <td>
          <div class="kb-deadlines__description" v-html="deadline.description"></div>
          <div class="kb-deadlines__clarification" v-html="deadline.clarification"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { KirbyDeadlinesData } from "~/queries/deadlines";

const { locale } = useI18n();

defineProps<{
  block: KirbyBlock<"deadlines", KirbyDeadlinesData>;
}>();
</script>

<style scoped>
.kb-deadlines {
  td:first-child {
    width: 1px;
    white-space: nowrap;
  }

  td,
  th {
    vertical-align: top;
  }

  td p {
    margin-bottom: 0.4rem;
  }
}
</style>

<style>
.kb-deadlines__description {
  p {
    margin-top: 0;
    margin-bottom: 0.4rem;
  }
}

.kb-deadlines__clarification {
  font-size: 0.8rem;
  p {
    margin-top: 0;
    margin-bottom: 0.4rem;
  }
}
</style>
