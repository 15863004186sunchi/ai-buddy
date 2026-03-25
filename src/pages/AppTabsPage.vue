<template>
  <MobileViewport scroll-test-id="app-scroll">
    <HomeTab v-if="activeTab === 'home'" />

    <CompanionTab v-else-if="activeTab === 'companion'" />

    <section v-else-if="activeTab === 'journal'" class="app-tabs-page__placeholder">
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

    <section v-else class="app-tabs-page__placeholder">
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

    <template #bottom>
      <BottomNav :active="activeTab" @select="selectTab" />
    </template>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BottomNav from '@/components/navigation/BottomNav.vue';
import CompanionTab from '@/components/tabs/CompanionTab.vue';
import HomeTab from '@/components/tabs/HomeTab.vue';
import { healingCards, journalPrompts } from '@/data/home';
import MobileViewport from '@/layouts/MobileViewport.vue';

const route = useRoute();
const router = useRouter();

const validTabs = ['home', 'companion', 'journal', 'healing'] as const;
type AppTab = (typeof validTabs)[number];

const activeTab = computed<AppTab>(() => {
  const tab = route.params.tab;
  return typeof tab === 'string' && validTabs.includes(tab as AppTab) ? (tab as AppTab) : 'home';
});

async function selectTab(tab: string) {
  if (!validTabs.includes(tab as AppTab) || tab === activeTab.value) {
    return;
  }

  await router.push(`/app/${tab}`);
}
</script>

<style scoped>
.app-tabs-page__placeholder {
  display: grid;
  gap: 1.2rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.app-tabs-page__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.app-tabs-page__section-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
}

.app-tabs-page__feature-card {
  display: grid;
  grid-template-columns: 6.2rem 1fr;
  gap: 0.6rem;
  align-items: center;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.82);
  color: var(--color-text-muted);
}

.app-tabs-page__feature-card img {
  width: 100%;
  height: 5.5rem;
  object-fit: cover;
  border-radius: 18px;
}

.app-tabs-page__feature-card strong {
  color: var(--color-text);
}

.app-tabs-page__feature-card p {
  margin: 0.25rem 0 0;
}
</style>