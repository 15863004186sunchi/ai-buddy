<template>
  <component
    :is="tag"
    class="app-button"
    :class="[`app-button--${variant}`, { 'app-button--block': block }]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  block: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.app-button {
  border: none;
  border-radius: var(--radius-pill);
  padding: 1rem 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease;
  font-family: var(--font-display);
  font-weight: 700;
}

.app-button:hover {
  opacity: 0.96;
}

.app-button:active {
  transform: scale(0.98);
}

.app-button--block {
  width: 100%;
}

.app-button--primary {
  color: white;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
  box-shadow: 0 16px 30px rgba(97, 80, 176, 0.24);
}

.app-button--ghost {
  background: rgba(255, 255, 255, 0.55);
  color: var(--color-primary);
}

.app-button--secondary {
  background: var(--color-surface-soft);
  color: var(--color-text);
}
</style>
