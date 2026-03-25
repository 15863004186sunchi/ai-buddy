<template>
  <MobileViewport>
    <main class="welcome-page">
      <div class="welcome-page__brand">SoulEcho</div>

      <section class="welcome-page__hero glass-panel">
        <p class="welcome-page__eyebrow">给情绪一个温柔的落点</p>
        <h1 class="page-title welcome-page__title">
          寻找你内心的<br />
          <span class="gradient-text">宁静圣殿</span>
        </h1>
        <p class="page-copy welcome-page__copy">
          让每一份情绪都有归宿，让每一个声音都能被温柔接住。
        </p>
        <AppButton block data-testid="welcome-cta" @click="router.push('/onboarding/1')">
          进入体验
        </AppButton>
      </section>

      <div class="welcome-page__rings" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import MobileViewport from '@/layouts/MobileViewport.vue';

const router = useRouter();
</script>

<style scoped>
.welcome-page {
  min-height: 100%;
  padding: 1.5rem 1.5rem 2rem;
  display: grid;
  align-content: start;
  gap: 1.4rem;
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(194, 253, 237, 0.65), transparent 28%),
    radial-gradient(circle at bottom left, rgba(161, 144, 245, 0.18), transparent 32%);
}

.welcome-page__brand,
.welcome-page__hero {
  position: relative;
  z-index: 1;
}

.welcome-page__brand {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-primary);
}

.welcome-page__hero {
  display: grid;
  gap: 1.1rem;
  padding: 1.75rem;
  border-radius: 34px;
  margin-top: 1rem;
}

.welcome-page__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-weight: 700;
}

.welcome-page__title {
  margin: 0;
  line-height: 1.1;
}

.welcome-page__copy {
  max-width: 22rem;
}

.welcome-page__rings {
  position: absolute;
  inset: auto 0 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  pointer-events: none;
  z-index: 0;
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