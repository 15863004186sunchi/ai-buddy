<template>
  <nav class="bottom-nav" data-testid="bottom-nav">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': item.key === active }"
      :data-testid="`nav-${item.key}`"
      @click="$emit('select', item.key)"
    >
      <svg class="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path :d="item.icon" />
      </svg>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { key: 'home', label: '首页', icon: 'M3 11.5 12 4l9 7.5M5 10.5V20h14v-9.5M9 20v-5h6v5' },
  { key: 'chat', label: '陪伴', icon: 'M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H10l-4 3v-3.5A2.5 2.5 0 0 1 5 13.5z' },
  { key: 'journal', label: '日记', icon: 'M7 4.5h8.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 0 5 22V7A2.5 2.5 0 0 1 7.5 4.5zM9 9h6M9 13h6M9 17h4' },
  { key: 'healing', label: '疗愈', icon: 'M12 20s-6.5-4.2-6.5-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 6.5 2.5C18.5 15.8 12 20 12 20Z' },
];

defineProps<{
  active: string;
}>();

defineEmits<{
  select: [key: string];
}>();
</script>

<style scoped>
.bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 1rem 1rem 1.4rem;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

.bottom-nav__item {
  border: none;
  background: transparent;
  border-radius: var(--radius-pill);
  padding: 0.8rem 0.35rem;
  display: grid;
  gap: 0.25rem;
  justify-items: center;
  color: var(--color-text-muted);
  cursor: pointer;
}

.bottom-nav__item--active {
  background: linear-gradient(135deg, rgba(161, 144, 245, 0.2), rgba(255, 219, 204, 0.3));
  color: var(--color-primary);
}

.bottom-nav__icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>