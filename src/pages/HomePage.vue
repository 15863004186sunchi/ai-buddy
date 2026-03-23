<template>
  <MobileViewport>
    <main class="home-page">
      <header class="home-page__header">
        <div class="home-page__brand-block">
          <div class="home-page__brand-line">
            <img class="home-page__avatar" :src="profileAvatar" alt="用户头像" />
            <p class="home-page__eyebrow">今日状态</p>
          </div>
          <h1 class="page-title">你好，{{ userName }}</h1>
        </div>
        <button class="home-page__logout" data-testid="logout-button" @click="logout">退出</button>
      </header>

      <section v-if="activeTab === 'home'" class="home-page__content home-page__content--overview">
        <section class="home-page__daily">
          <div class="home-page__section-header">
            <h2>{{ dailyEcho.title }}</h2>
            <span>{{ dailyEcho.date }}</span>
          </div>
          <article class="home-page__echo-card">
            <img :src="dailyEcho.image" alt="每日回响配图" />
            <div class="home-page__echo-overlay">
              <p class="home-page__quote">“{{ dailyEcho.quote }}”</p>
              <p class="page-copy">{{ dailyEcho.description }}</p>
            </div>
          </article>
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
              <img :src="item.image" :alt="item.title" />
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.meta }}</span>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section v-else-if="activeTab === 'chat'" class="home-page__content">
        <div class="home-page__section-header">
          <h2>陪伴对话</h2>
        </div>
        <article v-for="card in companionCards" :key="card.title" class="home-page__feature-card glass-panel">
          <img :src="card.image" :alt="card.title" />
          <div>
            <strong>{{ card.title }}</strong>
            <p>{{ card.text }}</p>
          </div>
        </article>
      </section>

      <section v-else-if="activeTab === 'journal'" class="home-page__content">
        <div class="home-page__section-header">
          <h2>今日日记</h2>
        </div>
        <article v-for="prompt in journalPrompts" :key="prompt.title" class="home-page__feature-card glass-panel">
          <img :src="prompt.image" :alt="prompt.title" />
          <div>
            <strong>{{ prompt.title }}</strong>
            <p>{{ prompt.text }}</p>
          </div>
        </article>
      </section>

      <section v-else class="home-page__content">
        <div class="home-page__section-header">
          <h2>疗愈时刻</h2>
        </div>
        <article v-for="card in healingCards" :key="card.title" class="home-page__feature-card glass-panel">
          <img :src="card.image" :alt="card.title" />
          <div>
            <strong>{{ card.title }}</strong>
            <p>{{ card.meta }}</p>
          </div>
        </article>
      </section>

      <BottomNav :active="activeTab" @select="activeTab = $event" />
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import BottomNav from '@/components/navigation/BottomNav.vue';
import {
  companionCards,
  dailyEcho,
  healingCards,
  journalPrompts,
  moodOptions,
  profileAvatar,
  recommendations,
} from '@/data/home';
import MobileViewport from '@/layouts/MobileViewport.vue';
import { useSession } from '@/composables/useSession';

const router = useRouter();
const session = useSession();
const userName = computed(() => session.user.value?.displayName ?? '旅伴');
const activeTab = ref<'home' | 'chat' | 'journal' | 'healing'>('home');

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
  align-items: flex-start;
  gap: 1rem;
}

.home-page__brand-block {
  display: grid;
  gap: 0.45rem;
}

.home-page__brand-line {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.home-page__avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  object-fit: cover;
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

.home-page__content {
  display: grid;
  gap: 1.2rem;
}

.home-page__section,
.home-page__daily {
  display: grid;
  gap: 0.8rem;
}

.home-page__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.home-page__section-header span {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.home-page__echo-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  min-height: 18rem;
}

.home-page__echo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.home-page__echo-overlay {
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

.home-page__quote {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.6;
}

.home-page__moods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.home-page__mood-card,
.home-page__recommendation-card,
.home-page__feature-card {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.82);
  color: var(--color-text-muted);
}

.home-page__mood-card strong,
.home-page__recommendation-card strong,
.home-page__feature-card strong {
  color: var(--color-text);
}

.home-page__recommendations,
.home-page__content--overview {
  display: grid;
  gap: 1.2rem;
}

.home-page__recommendation-card {
  grid-template-columns: 5.5rem 1fr;
  align-items: center;
}

.home-page__recommendation-card img,
.home-page__feature-card img {
  width: 100%;
  height: 5.5rem;
  object-fit: cover;
  border-radius: 18px;
}

.home-page__feature-card {
  grid-template-columns: 6.2rem 1fr;
  align-items: center;
}

.home-page__feature-card p,
.home-page__recommendation-card span {
  margin: 0.25rem 0 0;
}
</style>