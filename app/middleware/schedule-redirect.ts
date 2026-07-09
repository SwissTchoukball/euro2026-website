export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return;
  if (to.params.month) return;

  const appConfig = useAppConfig();
  const localePath = useLocalePath();

  const days = appConfig.eventDays.map((d: string) => new Date(d));
  const today = new Date();

  const matchingDay = days.find(
    (d: Date) =>
      d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(),
  );
  if (matchingDay) {
    return navigateTo(localePath(`/schedule/${matchingDay.getMonth() + 1}/${matchingDay.getDate()}`));
  }

  const closestUpcomingDay = days.find((d: Date) => d > today);
  if (closestUpcomingDay) {
    return navigateTo(localePath(`/schedule/${closestUpcomingDay.getMonth() + 1}/${closestUpcomingDay.getDate()}`));
  }
});
