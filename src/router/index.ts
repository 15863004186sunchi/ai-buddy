import type { RouterHistory } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import { useSession } from '@/composables/useSession';
import AppTabsPage from '@/pages/AppTabsPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import OnboardingPage from '@/pages/OnboardingPage.vue';
import WelcomePage from '@/pages/WelcomePage.vue';

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  const router = createRouter({
    history,
    routes: [
      { path: '/', redirect: '/welcome' },
      { path: '/welcome', name: 'welcome', component: WelcomePage },
      { path: '/onboarding/:step(1|2|3)', name: 'onboarding', component: OnboardingPage },
      { path: '/auth', name: 'auth', component: AuthPage },
      { path: '/register', name: 'register', component: AuthPage },
      { path: '/app/:tab(home|companion|journal|healing)', name: 'app', component: AppTabsPage },
    ],
  });

  router.beforeEach((to) => {
    if (to.name === 'app' && !useSession().isAuthenticated.value) {
      return '/auth';
    }

    return true;
  });

  return router;
}

export const router = createAppRouter();