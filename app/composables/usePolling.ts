export const usePolling = (polledCall: () => Promise<unknown>, intervalSeconds = 5) => {
  const refreshIntervalRef = ref<number>();

  onMounted(() => {
    refreshIntervalRef.value = window.setInterval(() => {
      polledCall();
    }, intervalSeconds * 1000);
  });

  onUnmounted(() => {
    window.clearInterval(refreshIntervalRef.value);
  });
};
