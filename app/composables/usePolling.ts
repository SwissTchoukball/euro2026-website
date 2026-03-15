export const usePolling = (polledCall: () => Promise<unknown>) => {
  const tenSeconds = 1000 * 10;
  const refreshIntervalRef = ref<number>();

  onMounted(() => {
    refreshIntervalRef.value = window.setInterval(() => {
      polledCall();
    }, tenSeconds);
  });

  onUnmounted(() => {
    window.clearInterval(refreshIntervalRef.value);
  });
};
