<template>
  <div class="c-team-member">
    <img
      v-if="member.portrait[0]"
      class="c-team-member__portrait"
      :src="member.portrait[0].url"
      :alt="member.firstName + ' ' + member.lastName"
    />
    <div v-else class="c-team-member__portrait"></div>
    <div class="c-team-member__content">
      <h3 class="c-team-member__name">{{ member.firstName + " " + member.lastName }}</h3>
      <p v-if="member.position" class="c-team-member__position">
        {{ $t(`competition.team.member.position.${member.position}`) }}
      </p>
      <p v-if="member.jerseyNumber" class="c-team-member__jersey-number">#{{ member.jerseyNumber }}</p>
      <p v-if="member.role" class="c-team-member__role">{{ member.role }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  member: {
    uuid: string;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber: string;
    role: string;
    portrait: {
      url: string;
    }[];
  };
}>();
</script>

<style scoped>
.c-team-member {
  background-color: var(--euro-gray-050);
  border-radius: 0.5rem;
  max-width: 250px;
  height: 100%;
  border: 1px solid var(--euro-gray-200);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.c-team-member__portrait {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: white;
  border-radius: 0.5rem 0.5rem 0 0;
}

.c-team-member__content {
  position: relative;
  padding: var(--euro-spacing-4);
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.c-team-member__name {
  font-size: 1.2rem;
  font-weight: bold;
}

.c-team-member__jersey-number {
  position: absolute;
  top: -3.3rem;
  right: 0.5rem;

  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
}

.c-team-member__position {
  font-size: 0.8rem;
}

.c-team-member__role {
  font-size: 0.8rem;
}
</style>
