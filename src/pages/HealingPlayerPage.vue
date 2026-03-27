<template>
  <MobileViewport scroll-test-id="healing-player-scroll">
    <section
      v-if="detail"
      class="healing-player-page"
      data-testid="healing-player-page"
      :style="{ '--healing-background-image': `url(${detail.backgroundImage})` }"
    >
      <div class="healing-player-page__background" aria-hidden="true"></div>
      <div class="healing-player-page__glow" aria-hidden="true"></div>

      <header class="healing-player-page__header">
        <button
          type="button"
          class="healing-player-page__icon-button"
          data-testid="healing-player-back"
          aria-label="返回疗愈"
          @click="goBack"
        >
          ˅
        </button>
        <h1>SoulEcho</h1>
        <button type="button" class="healing-player-page__icon-button" aria-label="更多操作">⋯</button>
      </header>

      <section class="healing-player-page__hero">
        <div class="healing-player-page__artwork-halo" aria-hidden="true"></div>
        <div class="healing-player-page__artwork" data-testid="healing-player-artwork">
          <img :src="detail.coverImage" :alt="detail.title" />
        </div>
        <div class="healing-player-page__meta">
          <h2>{{ detail.title }}</h2>
          <p>{{ detail.description }}</p>
          <span class="healing-player-page__badge" data-testid="healing-player-badge">
            {{ detail.typeLabel || '冥想引导' }}
          </span>
        </div>
      </section>

      <section class="healing-player-page__panel">
        <div class="healing-player-page__progress" data-testid="healing-player-progress">
          <div class="healing-player-page__progress-track">
            <div class="healing-player-page__progress-fill" :style="{ width: `${detail.progressPercent}%` }"></div>
          </div>
          <div class="healing-player-page__progress-meta">
            <span>{{ detail.currentTime }}</span>
            <span>{{ detail.duration }}</span>
          </div>
        </div>

        <div class="healing-player-page__controls" data-testid="healing-player-controls">
          <button type="button" class="healing-player-page__side-button" aria-label="随机播放">随机</button>

          <div class="healing-player-page__transport">
            <button type="button" class="healing-player-page__transport-button" aria-label="上一首">上一首</button>
            <button
              type="button"
              class="healing-player-page__toggle"
              data-testid="healing-player-toggle"
              :data-state="playbackState"
              :aria-pressed="String(isPlaying)"
              @click="togglePlayback"
            >
              <span>{{ isPlaying ? '暂停' : '播放' }}</span>
            </button>
            <button type="button" class="healing-player-page__transport-button" aria-label="下一首">下一首</button>
          </div>

          <button type="button" class="healing-player-page__side-button" aria-label="循环播放">循环</button>
        </div>
      </section>
    </section>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getHealingTrack } from '@/data/healing';
import MobileViewport from '@/layouts/MobileViewport.vue';

const route = useRoute();
const router = useRouter();
const isPlaying = ref(true);

const detail = computed(() => getHealingTrack(String(route.params.id ?? 'track-1')));
const playbackState = computed(() => (isPlaying.value ? 'playing' : 'paused'));

watchEffect(() => {
  if (!detail.value) {
    void router.replace('/app/healing');
  }
});

async function goBack() {
  await router.replace('/app/healing');
}

function togglePlayback() {
  isPlaying.value = !isPlaying.value;
}
</script>

<style scoped>
.healing-player-page {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  display: grid;
  align-content: start;
  gap: 2rem;
  padding: 1rem 1.25rem 1.75rem;
  background:
    linear-gradient(180deg, rgba(250, 249, 246, 0.38), rgba(250, 249, 246, 0.14)),
    linear-gradient(180deg, rgba(194, 253, 237, 0.18), rgba(161, 144, 245, 0.18));
}

.healing-player-page__background,
.healing-player-page__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.healing-player-page__background {
  background-image: var(--healing-background-image);
  background-position: center;
  background-size: cover;
  opacity: 0.34;
  filter: blur(6px);
  transform: scale(1.08);
}

.healing-player-page__glow {
  background: radial-gradient(circle at 50% 38%, rgba(161, 144, 245, 0.34), rgba(194, 253, 237, 0.2), transparent 72%);
}

.healing-player-page__header,
.healing-player-page__hero,
.healing-player-page__panel {
  position: relative;
  z-index: 1;
}

.healing-player-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.healing-player-page__header h1,
.healing-player-page__meta h2 {
  margin: 0;
  font-family: var(--font-display);
}

.healing-player-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.42);
  color: var(--color-primary);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-card);
}

.healing-player-page__hero {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 1rem;
  padding-top: 1rem;
}

.healing-player-page__artwork-halo {
  position: absolute;
  inset: 0 auto auto 50%;
  width: 18rem;
  height: 18rem;
  border-radius: 999px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(161, 144, 245, 0.3), rgba(194, 253, 237, 0.2), transparent 74%);
  filter: blur(18px);
}

.healing-player-page__artwork {
  position: relative;
  width: min(72vw, 18rem);
  aspect-ratio: 1;
  border-radius: 999px;
  overflow: hidden;
  border: 6px solid rgba(255, 255, 255, 0.86);
  box-shadow: 0 24px 50px rgba(32, 0, 110, 0.18);
}

.healing-player-page__artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.healing-player-page__meta {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}

.healing-player-page__meta p {
  margin: 0;
  max-width: 22rem;
  color: rgba(48, 51, 48, 0.82);
  line-height: 1.7;
}

.healing-player-page__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: rgba(194, 253, 237, 0.48);
  color: #2b6358;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.healing-player-page__panel {
  margin-top: auto;
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.36);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-card);
}

.healing-player-page__progress {
  display: grid;
  gap: 0.8rem;
}

.healing-player-page__progress-track {
  height: 0.4rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(225, 227, 222, 0.95);
}

.healing-player-page__progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-soft));
}

.healing-player-page__progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.healing-player-page__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.healing-player-page__transport {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.healing-player-page__side-button,
.healing-player-page__transport-button {
  border: none;
  background: none;
  color: var(--color-text);
  font-weight: 600;
}

.healing-player-page__toggle {
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), #5544a3);
  color: white;
  font-weight: 700;
  box-shadow: 0 18px 30px rgba(97, 80, 176, 0.28);
}

.healing-player-page__toggle[data-state='paused'] {
  background: linear-gradient(135deg, rgba(255, 219, 204, 0.96), rgba(124, 86, 69, 0.88));
}
</style>
