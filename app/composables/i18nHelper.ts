export function useI18nHelper() {
  const { t, te } = useI18n();

  const localizeCompetitionEntityName = (name: string): string => {
    const key = `competition.name.${name}`;
    return te(key) ? t(key) : name;
  };

  return {
    localizeCompetitionEntityName,
  };
}
