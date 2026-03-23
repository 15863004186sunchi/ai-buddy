<template>
  <transition name="fade">
    <p v-if="message" class="toast-banner">{{ message }}</p>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.toast-banner {
  margin: 0;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(49, 104, 93, 0.12);
  color: #255349;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
