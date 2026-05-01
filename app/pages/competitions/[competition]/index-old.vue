<template>
  <main>
    <euro-game-planning-overview :planning-overview="competitionData?.overview" />
  </main>
</template>

<script setup lang="ts">
defineProps<{
  competitionData: any;
}>();
</script>
