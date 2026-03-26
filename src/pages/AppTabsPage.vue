<template>
  <MobileViewport scroll-test-id="app-scroll">
    <HomeTab v-if="activeTab === 'home'" />
    <CompanionTab v-else-if="activeTab === 'companion'" />
    <JournalTab v-else-if="activeTab === 'journal'" />
    <HealingTab v-else />

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
import HealingTab from '@/components/tabs/HealingTab.vue';
import HomeTab from '@/components/tabs/HomeTab.vue';
import JournalTab from '@/components/tabs/JournalTab.vue';
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