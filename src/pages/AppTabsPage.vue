<template>
  <MobileViewport scroll-test-id="app-scroll">
    <main class="app-tabs-page">
      <header class="app-tabs-page__header">
        <div class="app-tabs-page__brand-block">
          <div class="app-tabs-page__brand-line">
            <img class="app-tabs-page__avatar" :src="profileAvatar" alt="用户头像" />
            <p class="app-tabs-page__eyebrow">今日状态</p>
          </div>
          <h1 class="page-title">你好，{{ userName }}</h1>
        </div>
        <button class="app-tabs-page__logout" data-testid="logout-button" @click="logout">退出</button>
      </header>

      <section v-if="activeTab === 'home'" class="app-tabs-page__content app-tabs-page__content--overview">
        <section class="app-tabs-page__daily">
          <div class="app-tabs-page__section-header">
            <h2>{{ dailyEcho.title }}</h2>
            <span>{{ dailyEcho.date }}</span>
          </div>
          <article class="app-tabs-page__echo-card">
            <img :src="dailyEcho.image" alt="每日回响配图" />
            <div class="app-tabs-page__echo-overlay">
              <p class="app-tabs-page__quote">“{{ dailyEcho.quote }}”</p>
              <p class="page-copy">{{ dailyEcho.description }}</p>
            </div>
          </article>
        </section>

        <section class="app-tabs-page__section">
          <div class="app-tabs-page__section-header">
            <h2>此刻的你</h2>
          </div>
          <div class="app-tabs-page__moods">
            <article v-for="item in moodOptions" :key="item.label" class="app-tabs-page__mood-card">
              <strong>{{ item.label }}</strong>
              <span>{{ item.hint }}</span>
            </article>
          </div>
        </section>

        <section class="app-tabs-page__section">
          <div class="app-tabs-page__section-header">
            <h2>为你推荐</h2>
          </div>
          <div class="app-tabs-page__recommendations">
            <article v-for="item in recommendations" :key="item.title" class="app-tabs-page__recommendation-card glass-panel">
              <img :src="item.image" :alt="item.title" />
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.meta }}</span>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section v-else-if="activeTab === 'companion'" class="app-tabs-page__content">
        <div class="app-tabs-page__section-header">
          <h2>陪伴对话</h2>
        </div>
        <article v-for="card in companionCards" :key="card.title" class="app-tabs-page__feature-card glass-panel">
          <img :src="card.image" :alt="card.title" />
          <div>
            <strong>{{ card.title }}</strong>
            <p>{{ card.text }}</p>
          </div>
        </article>
      </section>

      <section v-else-if="activeTab === 'journal'" class="app-tabs-page__content">
        <div class="app-tabs-page__section-header">
          <h2>今日日记</h2>
        </div>
        <article v-for="prompt in journalPrompts" :key="prompt.title" class="app-tabs-page__feature-card glass-panel">
          <img :src="prompt.image" :alt="prompt.title" />
          <div>
            <strong>{{ prompt.title }}</strong>
            <p>{{ prompt.text }}</p>
          </div>
        </article>
      </section>

      <section v-else class="app-tabs-page__content">
        <div class="app-tabs-page__section-header">
          <h2>疗愈时刻</h2>
        </div>
        <article v-for="card in healingCards" :key="card.title" class="app-tabs-page__feature-card glass-panel">
          <img :src="card.image" :alt="card.title" />
          <div>
            <strong>{{ card.title }}</strong>
            <p>{{ card.meta }}</p>
          </div>
        </article>
      </section>
    </main>

    <template #bottom>
      <BottomNav :active="activeTab" @select="selectTab" />
    </template>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
import { useSession } from '@/composables/useSession';
import MobileViewport from '@/layouts/MobileViewport.vue';

const route = useRoute();
const router = useRouter();
const session = useSession();

const validTabs = ['home', 'companion', 'journal', 'healing'] as const;
type AppTab = (typeof validTabs)[number];

const activeTab = computed<AppTab>(() => {
  const tab = route.params.tab;
  return typeof tab === 'string' && validTabs.includes(tab as AppTab) ? (tab as AppTab) : 'home';
});
const userName = computed(() => session.user.value?.displayName ?? '旅伴');

async function logout() {
  session.logout();
  await router.push('/welcome');
}

async function selectTab(tab: string) {
  if (!validTabs.includes(tab as AppTab) || tab === activeTab.value) {
    return;
  }

  await router.push(`/app/${tab}`);
}
</script>

<style scoped>
.app-tabs-page {
  min-height: 100%;
  display: grid;
  gap: 1.2rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.app-tabs-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.app-tabs-page__brand-block {
  display: grid;
  gap: 0.45rem;
}

.app-tabs-page__brand-line {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.app-tabs-page__avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  object-fit: cover;
}

.app-tabs-page__eyebrow,
.app-tabs-page__section-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
}

.app-tabs-page__logout {
  border: none;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-text-muted);
  border-radius: var(--radius-pill);
  padding: 0.7rem 1rem;
  cursor: pointer;
}

.app-tabs-page__content {
  display: grid;
  gap: 1.2rem;
  align-content: start;
}

.app-tabs-page__section,
.app-tabs-page__daily {
  display: grid;
  gap: 0.8rem;
}

.app-tabs-page__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.app-tabs-page__section-header span {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.app-tabs-page__echo-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  min-height: 18rem;
}

.app-tabs-page__echo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.app-tabs-page__echo-overlay {
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

.app-tabs-page__quote {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.6;
}

.app-tabs-page__moods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.app-tabs-page__mood-card,
.app-tabs-page__recommendation-card,
.app-tabs-page__feature-card {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.82);
  color: var(--color-text-muted);
}

.app-tabs-page__mood-card strong,
.app-tabs-page__recommendation-card strong,
.app-tabs-page__feature-card strong {
  color: var(--color-text);
}

.app-tabs-page__recommendations,
.app-tabs-page__content--overview {
  display: grid;
  gap: 1.2rem;
}

.app-tabs-page__recommendation-card {
  grid-template-columns: 5.5rem 1fr;
  align-items: center;
}

.app-tabs-page__recommendation-card img,
.app-tabs-page__feature-card img {
  width: 100%;
  height: 5.5rem;
  object-fit: cover;
  border-radius: 18px;
}

.app-tabs-page__feature-card {
  grid-template-columns: 6.2rem 1fr;
  align-items: center;
}

.app-tabs-page__feature-card p,
.app-tabs-page__recommendation-card span {
  margin: 0.25rem 0 0;
}
</style>