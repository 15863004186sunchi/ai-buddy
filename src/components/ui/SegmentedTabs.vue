<template>
  <div class="segmented-tabs">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="segmented-tabs__item"
      :class="{ 'segmented-tabs__item--active': option.value === modelValue }"
      :data-testid="`auth-tab-${option.value}`"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface TabOption {
  label: string;
  value: string;
}

defineProps<{
  modelValue: string;
  options: TabOption[];
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.segmented-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.35rem;
  background: rgba(255, 255, 255, 0.65);
  border-radius: var(--radius-pill);
}

.segmented-tabs__item {
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  padding: 0.8rem 1rem;
  border-radius: var(--radius-pill);
  font-weight: 700;
  cursor: pointer;
}

.segmented-tabs__item--active {
  color: var(--color-primary);
  background: white;
  box-shadow: 0 6px 18px rgba(48, 51, 48, 0.08);
}
</style>
