<template>
  <MobileViewport>
    <main class="home-page">
      <header class="home-page__header">
        <div>
          <p class="home-page__eyebrow">今日状态</p>
          <h1 class="page-title">你好，{{ userName }}</h1>
        </div>
        <button class="home-page__logout" data-testid="logout-button" @click="logout">退出</button>
      </header>

      <section class="home-page__hero glass-panel">
        <p class="home-page__quote">“在柔和的节奏里，留一点空间给真正的自己。”</p>
        <p class="page-copy">今天适合做一次轻量记录，或者从 5 分钟的呼吸练习开始。</p>
      </section>

      <section class="home-page__section">
        <div class="home-page__section-header">
          <h2>此刻的你</h2>
        </div>
        <div class="home-page__moods">
          <article v-for="item in moodOptions" :key="item.label" class="home-page__mood-card">
            <strong>{{ item.label }}</strong>
            <span>{{ item.hint }}</span>
          </article>
        </div>
      </section>

      <section class="home-page__section">
        <div class="home-page__section-header">
          <h2>为你推荐</h2>
        </div>
        <div class="home-page__recommendations">
          <article v-for="item in recommendations" :key="item.title" class="home-page__recommendation-card glass-panel">
            <strong>{{ item.title }}</strong>
            <span>{{ item.meta }}</span>
          </article>
        </div>
      </section>

      <BottomNav active="home" @logout="logout" />
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import BottomNav from '@/components/navigation/BottomNav.vue';
import { moodOptions, recommendations } from '@/data/home';
import MobileViewport from '@/layouts/MobileViewport.vue';
import { useSession } from '@/composables/useSession';

const router = useRouter();
const session = useSession();
const userName = computed(() => session.user.value?.displayName ?? '旅伴');

async function logout() {
  session.logout();
  await router.push('/');
}
</script>

<style scoped>
.home-page {
  min-height: 100%;
  display: grid;
  align-content: start;
  gap: 1.2rem;
  padding: 1.4rem 1.4rem 0;
}

.home-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.home-page__eyebrow,
.home-page__section-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
}

.home-page__logout {
  border: none;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-text-muted);
  border-radius: var(--radius-pill);
  padding: 0.7rem 1rem;
  cursor: pointer;
}

.home-page__hero {
  padding: 1.35rem;
  border-radius: var(--radius-xl);
}

.home-page__quote {
  margin: 0 0 0.8rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.5;
}

.home-page__section {
  display: grid;
  gap: 0.8rem;
}

.home-page__moods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.home-page__mood-card,
.home-page__recommendation-card {
  display: grid;
  gap: 0.45rem;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.75);
  color: var(--color-text-muted);
}

.home-page__mood-card strong,
.home-page__recommendation-card strong {
  color: var(--color-text);
}

.home-page__recommendations {
  display: grid;
  gap: 0.75rem;
}
</style>