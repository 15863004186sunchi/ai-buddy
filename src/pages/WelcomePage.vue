<template>
  <MobileViewport>
    <main class="welcome-page">
      <div class="welcome-page__brand">AI Buddy</div>
      <div class="welcome-page__hero glass-panel">
        <p class="welcome-page__eyebrow">给情绪一个温柔的落点</p>
        <h1 class="page-title">
          开始你的<span class="gradient-text">心灵旅程</span>
        </h1>
        <p class="page-copy">
          这是一段轻盈又真实的陪伴体验，从觉察、记录到安放心绪，都有人和你并肩。
        </p>
        <AppButton block data-testid="welcome-cta" @click="router.push('/onboarding/1')">
          进入体验
        </AppButton>
      </div>
      <div class="welcome-page__rings">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import MobileViewport from '@/layouts/MobileViewport.vue';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();
</script>

<style scoped>
.welcome-page {
  min-height: 100%;
  padding: 2rem;
  display: grid;
  align-content: center;
  gap: 2rem;
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(194, 253, 237, 0.65), transparent 28%),
    radial-gradient(circle at bottom left, rgba(161, 144, 245, 0.18), transparent 32%);
}

.welcome-page__brand {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-primary);
}

.welcome-page__hero {
  display: grid;
  gap: 1.4rem;
  padding: 2rem;
  border-radius: 34px;
}

.welcome-page__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-weight: 700;
}

.welcome-page__rings {
  position: absolute;
  inset: auto 0 2rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.welcome-page__rings span {
  border: 1px solid rgba(97, 80, 176, 0.12);
  border-radius: 999px;
}

.welcome-page__rings span:nth-child(1) {
  width: 5rem;
  height: 5rem;
}

.welcome-page__rings span:nth-child(2) {
  width: 7.5rem;
  height: 7.5rem;
}

.welcome-page__rings span:nth-child(3) {
  width: 10rem;
  height: 10rem;
}
</style>
