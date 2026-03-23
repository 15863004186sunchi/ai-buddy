<template>
  <div class="progress-dots" aria-label="流程进度">
    <span
      v-for="index in count"
      :key="index"
      class="progress-dots__item"
      :class="{ 'progress-dots__item--active': index === current }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number;
  current: number;
}>();
</script>

<style scoped>
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 0.55rem;
}

.progress-dots__item {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: rgba(97, 80, 176, 0.18);
  transition: all 0.2s ease;
}

.progress-dots__item--active {
  width: 1.8rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
}
</style>
