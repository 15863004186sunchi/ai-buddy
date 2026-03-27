<template>
  <section class="secondary-page healing-player-page" data-testid="healing-player-page">
    <header class="secondary-page__header">
      <button type="button" class="secondary-page__back" data-testid="healing-player-back" @click="goBack">
        Back
      </button>
      <h1>Healing Player</h1>
    </header>
    <p class="secondary-page__copy">Healing player page shell</p>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.secondary-page {
  min-height: 100vh;
  padding: 1.5rem;
  display: grid;
  align-content: start;
  gap: 1rem;
  background: linear-gradient(180deg, rgba(244, 248, 245, 0.92), rgba(232, 237, 255, 0.96));
}

.secondary-page__header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.secondary-page__header h1,
.secondary-page__copy {
  margin: 0;
}

.secondary-page__back {
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text, #1f1a33);
}
</style>