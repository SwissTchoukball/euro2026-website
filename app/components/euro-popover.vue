<template>
  <PopoverRoot>
    <PopoverTrigger class="c-popover-trigger u-unstyled-button">
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent as-child class="c-popover-content" side="bottom" :side-offset="5">
        <slot name="content" />
        <PopoverClose class="PopoverClose" aria-label="Close">
          <Icon name="mdi:close" class="c-popover-close-icon" />
        </PopoverClose>
        <PopoverArrow class="c-popover-arrow" :width="8" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "reka-ui";
</script>

<style scoped>
.c-popover-trigger {
  font-family: inherit;
  cursor: pointer;
}

.c-popover-trigger:hover {
  background-color: var(--euro-sky-blue-200);
}

.c-popover-trigger:has(.iconify) {
  line-height: 0;
  border-radius: 50%;
}
</style>

<style>
.c-popover-content {
  border-radius: 0.5rem;
  padding: var(--euro-spacing-2) var(--euro-spacing-3);
  padding-right: var(--euro-spacing-6);
  font-size: 15px;
  line-height: 1;
  color: var(--grass-11);
  background-color: var(--euro-sky-blue-200);
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  width: 90vw;
  max-width: 60ch;
}

.c-popover-content[data-state="delayed-open"][data-side="top"] {
  animation-name: slideDownAndFade;
}

.c-popover-content[data-state="delayed-open"][data-side="right"] {
  animation-name: slideLeftAndFade;
}

.c-popover-content[data-state="delayed-open"][data-side="bottom"] {
  animation-name: slideUpAndFade;
}

.c-popover-content[data-state="delayed-open"][data-side="left"] {
  animation-name: slideRightAndFade;
}

.c-popover-close-icon {
  font-family: inherit;
  cursor: pointer;
  border-radius: 100%;
  height: 1rem;
  width: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--euro-blue-500);
  position: absolute;
  top: 5px;
  right: 5px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
}

.c-popover-arrow {
  fill: var(--euro-sky-blue-200);
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
