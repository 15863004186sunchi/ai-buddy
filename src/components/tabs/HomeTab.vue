<template>
  <section class="home-tab">
    <header class="home-tab__header">
      <div class="home-tab__brand-block">
        <div class="home-tab__brand-line">
          <img class="home-tab__avatar" :src="profileAvatar" alt="用户头像" />
          <p class="home-tab__eyebrow">今日状态</p>
        </div>
        <h1 class="page-title">你好，{{ userName }}</h1>
      </div>
      <button class="home-tab__logout" data-testid="logout-button" @click="logout">退出</button>
    </header>

    <section class="home-tab__content home-tab__content--overview">
      <section class="home-tab__daily">
        <div class="home-tab__section-header">
          <h2>{{ dailyEcho.title }}</h2>
          <span>{{ dailyEcho.date }}</span>
        </div>
        <article class="home-tab__echo-card">
          <img :src="dailyEcho.image" alt="每日回响配图" />
          <div class="home-tab__echo-overlay">
            <p class="home-tab__quote">“{{ dailyEcho.quote }}”</p>
            <p class="page-copy">{{ dailyEcho.description }}</p>
          </div>
        </article>
      </section>

      <section class="home-tab__section">
        <div class="home-tab__section-header">
          <h2>此刻的你</h2>
        </div>
        <div class="home-tab__moods">
          <article v-for="item in moodOptions" :key="item.label" class="home-tab__mood-card">
            <strong>{{ item.label }}</strong>
            <span>{{ item.hint }}</span>
          </article>
        </div>
      </section>

      <section class="home-tab__section">
        <div class="home-tab__section-header">
          <h2>为你推荐</h2>
        </div>
        <div class="home-tab__recommendations">
          <article v-for="item in recommendations" :key="item.title" class="home-tab__recommendation-card glass-panel">
            <img :src="item.image" :alt="item.title" />
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.meta }}</span>
            </div>
          </article>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useSession } from '@/composables/useSession';
import { dailyEcho, moodOptions, profileAvatar, recommendations } from '@/data/home';

const router = useRouter();
const session = useSession();
const userName = computed(() => session.user.value?.displayName ?? '旅伴');

async function logout() {
  session.logout();
  await router.push('/welcome');
}
</script>

<style scoped>
.home-tab {
  display: grid;
  gap: 1.2rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.home-tab__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.home-tab__brand-block {
  display: grid;
  gap: 0.45rem;
}

.home-tab__brand-line {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.home-tab__avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  object-fit: cover;
}

.home-tab__eyebrow,
.home-tab__section-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
}

.home-tab__logout {
  border: none;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-text-muted);
  border-radius: var(--radius-pill);
  padding: 0.7rem 1rem;
  cursor: pointer;
}

.home-tab__content {
  display: grid;
  gap: 1.2rem;
  align-content: start;
}

.home-tab__section,
.home-tab__daily {
  display: grid;
  gap: 0.8rem;
}

.home-tab__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.home-tab__section-header span {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.home-tab__echo-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  min-height: 18rem;
}

.home-tab__echo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.home-tab__echo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.4rem;
  color: white;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0.08), rgba(18, 18, 18, 0.72));
}

.home-tab__quote {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.6;
}

.home-tab__moods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.home-tab__mood-card,
.home-tab__recommendation-card {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.82);
  color: var(--color-text-muted);
}

.home-tab__mood-card strong,
.home-tab__recommendation-card strong {
  color: var(--color-text);
}

.home-tab__recommendations,
.home-tab__content--overview {
  display: grid;
  gap: 1.2rem;
}

.home-tab__recommendation-card {
  grid-template-columns: 5.5rem 1fr;
  align-items: center;
}

.home-tab__recommendation-card img {
  width: 100%;
  height: 5.5rem;
  object-fit: cover;
  border-radius: 18px;
}

.home-tab__recommendation-card span {
  margin: 0.25rem 0 0;
}
</style>