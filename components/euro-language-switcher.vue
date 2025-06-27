<template>
  <SelectRoot v-model="language" v-model:open="isOpen">
    <SelectTrigger :class="`SelectTrigger u-unstyled-button ${$attrs.class}`" aria-label="Customise options">
      <SelectValue />
      <Icon icon="radix-icons:chevron-down" name="chevron down" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="SelectContent" :side-offset="5">
        <SelectScrollUpButton class="SelectScrollButton">
          <Icon icon="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport class="SelectViewport">
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in options"
              :key="index"
              class="SelectItem"
              :value="option"
              :disabled="option === locale"
              as-child
              @select="
                navigateTo(switchLocalePath(option));
                isOpen = false;
              "
            >
              <NuxtLink :to="switchLocalePath(option)">
                <SelectItemIndicator class="SelectItemIndicator">
                  <Icon icon="radix-icons:check" />
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </NuxtLink>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="SelectScrollButton">
          <Icon icon="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";

const NuxtLink = resolveComponent("NuxtLink");
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const language = ref(locale.value);

const options = locales.value.map((l) => l.code);
</script>

<style scoped>
.SelectTrigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1;
  gap: 0.3rem;
  background-color: transparent;
  text-transform: uppercase;
}

.SelectTrigger:hover {
  cursor: pointer;
  color: var(--euro-sky-blue-100) !important;
}

.SelectTrigger:focus-visible {
  box-shadow: 0 0 0 2px rgb(0, 86, 124);
  outline: none;
}
</style>

<style>
.SelectContent {
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 3;
}

.SelectViewport {
  padding: 5px;
}

.SelectItem {
  font-size: 0.8rem;
  line-height: 1;
  color: var(--euro-blue-100);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding-left: 25px;
  position: relative;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}
.SelectItem[data-disabled] {
  color: grey;
  pointer-events: none;
}
.SelectItem[data-highlighted] {
  outline: none;
  background-color: var(--euro-blue-100);
  color: white;
}

.SelectItemIndicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.SelectScrollButton {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: red;
  cursor: default;
}
</style>
