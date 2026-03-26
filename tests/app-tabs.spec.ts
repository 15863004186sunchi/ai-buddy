import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import AppTabsPage from '@/pages/AppTabsPage.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountApp(tab = '/app/home') {
  resetSessionForTests();
  localStorage.clear();
  useSession().register({
    displayName: 'Tester',
    email: 'tester@example.com',
    password: 'password123',
  });

  const router = createAppRouter(createMemoryHistory());
  router.push(tab);
  await router.isReady();

  const wrapper = mount(AppTabsPage, {
    global: {
      plugins: [router],
    },
  });

  return { wrapper, router };
}

describe('app tabs routing', () => {
  beforeEach(() => {
    resetSessionForTests();
    localStorage.clear();
  });

  it('renders the home tab for /app/home', async () => {
    const { wrapper } = await mountApp('/app/home');

    expect(wrapper.text()).toContain('\u6bcf\u65e5\u56de\u54cd');
  });

  it('renders companion as a chat screen for /app/companion', async () => {
    const { wrapper } = await mountApp('/app/companion');

    expect(wrapper.get('[data-testid="chat-thread"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="chat-composer"]').exists()).toBe(true);
  });

  it('renders journal as a list page for /app/journal', async () => {
    const { wrapper } = await mountApp('/app/journal');

    expect(wrapper.get('[data-testid="journal-list"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('\u5fc3\u60c5\u65e5\u8bb0');
  });

  it('renders healing as a discovery page for /app/healing', async () => {
    const { wrapper } = await mountApp('/app/healing');

    expect(wrapper.text()).toContain('\u7597\u6108\u7a7a\u95f4');
    expect(wrapper.get('[data-testid="healing-categories"]').exists()).toBe(true);
  });
});