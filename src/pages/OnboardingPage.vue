<template>
  <MobileViewport>
    <main class="onboarding-page">
      <header class="onboarding-page__header">
        <div>
          <p class="onboarding-page__eyebrow">{{ stepData.eyebrow }}</p>
          <h1 class="page-title">{{ stepData.title }}</h1>
        </div>
        <button class="onboarding-page__skip" @click="router.push('/auth')">跳过</button>
      </header>

      <GlassCard class="onboarding-page__card">
        <div class="onboarding-page__art" :style="artStyle">
          <span>{{ stepData.accent }}</span>
        </div>
        <p class="page-copy">{{ stepData.description }}</p>
      </GlassCard>

      <div class="onboarding-page__footer">
        <ProgressDots :count="onboardingSteps.length" :current="stepData.step" />
        <AppButton block @click="nextStep">
          {{ stepData.step === onboardingSteps.length ? '进入登录' : '继续' }}
        </AppButton>
      </div>
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import ProgressDots from '@/components/ui/ProgressDots.vue';
import { onboardingSteps } from '@/data/onboarding';
import MobileViewport from '@/layouts/MobileViewport.vue';

const route = useRoute();
const router = useRouter();

const step = computed(() => Number(route.params.step ?? 1));
const stepData = computed(() => onboardingSteps.find((item) => item.step === step.value) ?? onboardingSteps[0]);
const artStyle = computed(() => ({
  background: step.value === 1
    ? 'linear-gradient(135deg, rgba(161, 144, 245, 0.9), rgba(255, 219, 204, 0.9))'
    : step.value === 2
      ? 'linear-gradient(135deg, rgba(255, 219, 204, 0.95), rgba(194, 253, 237, 0.9))'
      : 'linear-gradient(135deg, rgba(194, 253, 237, 0.95), rgba(161, 144, 245, 0.82))',
}));

function nextStep() {
  if (step.value >= onboardingSteps.length) {
    router.push('/auth');
    return;
  }

  router.push(`/onboarding/${step.value + 1}`);
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100%;
  padding: 1.75rem;
  display: grid;
  gap: 1.5rem;
  background:
    radial-gradient(circle at top left, rgba(255, 219, 204, 0.28), transparent 26%),
    radial-gradient(circle at bottom right, rgba(194, 253, 237, 0.3), transparent 26%);
}

.onboarding-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.onboarding-page__eyebrow {
  margin: 0 0 0.55rem;
  color: var(--color-primary);
  font-weight: 700;
}

.onboarding-page__skip {
  border: none;
  background: rgba(255, 255, 255, 0.55);
  color: var(--color-text-muted);
  padding: 0.6rem 0.95rem;
  border-radius: var(--radius-pill);
  cursor: pointer;
}

.onboarding-page__card {
  display: grid;
  gap: 1.2rem;
}

.onboarding-page__art {
  min-height: 330px;
  border-radius: 28px;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  color: white;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
}

.onboarding-page__footer {
  display: grid;
  gap: 1rem;
  margin-top: auto;
}
</style>