<template>
  <nav class="bottom-nav">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': item.key === active }"
      @click="$emit(item.key === 'logout' ? 'logout' : 'select', item.key)"
    >
      <span class="bottom-nav__icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { key: 'home', label: '首页', icon: '?' },
  { key: 'chat', label: '陪伴', icon: '?' },
  { key: 'journal', label: '日记', icon: '?' },
  { key: 'logout', label: '退出', icon: '↗' },
];

defineProps<{
  active: string;
}>();

defineEmits(['select', 'logout']);
</script>

<style scoped>
.bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 1rem 1rem 1.4rem;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
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
  font-size: 1.1rem;
}
</style>
