import type { RouterHistory } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import { useSession } from '@/composables/useSession';
import AppTabsPage from '@/pages/AppTabsPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import HealingPlayerPage from '@/pages/HealingPlayerPage.vue';
import JournalDetailPage from '@/pages/JournalDetailPage.vue';
import OnboardingPage from '@/pages/OnboardingPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import WelcomePage from '@/pages/WelcomePage.vue';

const protectedRouteNames = new Set(['app', 'journal-detail', 'healing-player']);

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  const router = createRouter({
    history,
    routes: [
      { path: '/', redirect: '/welcome' },
      { path: '/welcome', name: 'welcome', component: WelcomePage },
      { path: '/onboarding/:step(1|2|3)', name: 'onboarding', component: OnboardingPage },
      { path: '/auth', name: 'auth', component: AuthPage },
      { path: '/register', name: 'register', component: RegisterPage },
      { path: '/app/:tab(home|companion|journal|healing)', name: 'app', component: AppTabsPage },
      { path: '/journal/:id', name: 'journal-detail', component: JournalDetailPage },
      { path: '/healing/:id', name: 'healing-player', component: HealingPlayerPage },
    ],
  });

  router.beforeEach((to) => {
    if (protectedRouteNames.has(String(to.name)) && !useSession().isAuthenticated.value) {
      return '/auth';
    }

    return true;
  });

  return router;
}

export const router = createAppRouter();