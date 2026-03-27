import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '@/App.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountSecondaryPage(path: string) {
  resetSessionForTests();
  localStorage.clear();
  useSession().register({
    displayName: 'Tester',
    email: 'tester@example.com',
    password: 'password123',
  });

  const router = createAppRouter(createMemoryHistory());
  router.push(path);
  await router.isReady();

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  return { router, wrapper };
}

describe('secondary pages', () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionForTests();
  });

  it('renders the journal detail route shell', async () => {
    const { router, wrapper } = await mountSecondaryPage('/journal/journal-1');

    expect(router.currentRoute.value.fullPath).toBe('/journal/journal-1');
    expect(wrapper.get('[data-testid="journal-detail-page"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Journal Detail');
  });

  it('renders the healing player route shell', async () => {
    const { router, wrapper } = await mountSecondaryPage('/healing/track-1');

    expect(router.currentRoute.value.fullPath).toBe('/healing/track-1');
    expect(wrapper.get('[data-testid="healing-player-page"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Healing Player');
  });
});