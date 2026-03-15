<template>
  <iframe :src="mapUrl" frameborder="0" class="c-swisstopo-map l-cancel-section-padding" />
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const {
  center,
  zoom = 10,
  layers = undefined,
  crosshair = undefined,
} = defineProps<{
  center: string;
  zoom?: number;
  layers?: string;
  crosshair?: string;
}>();

const mapUrl = computed(() => {
  let url = `//map.geo.admin.ch/#/embed` + `?center=${center}` + `&z=${zoom}` + `&lang=${locale.value}`;

  if (layers) {
    url += `&layers=${layers}`;
  }

  if (crosshair) {
    url += `&crosshair=${crosshair}`;
  }

  url += `&bgLayer=ch.swisstopo.pixelkarte-farbe&featureInfo=tooltip`;

  return url;
});
</script>

<style scoped>
.c-swisstopo-map {
  height: 50vh;
  border: none;
  margin-top: var(--euro-spacing-4);
}
</style>
