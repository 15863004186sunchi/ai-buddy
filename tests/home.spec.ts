import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import AppTabsPage from '@/pages/AppTabsPage.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountAppTabs(tab = '/app/home') {
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

describe('app tabs shell', () => {
  beforeEach(() => {
    resetSessionForTests();
    localStorage.clear();
  });

  it('renders image-based home content close to the prototype', async () => {
    const { wrapper } = await mountAppTabs();

    expect(wrapper.findAll('img').length).toBeGreaterThanOrEqual(3);
    expect(wrapper.text()).toContain('\u6bcf\u65e5\u56de\u54cd');
    expect(wrapper.text()).toContain('\u4e3a\u4f60\u63a8\u8350');
  });

  it('renders the bottom nav outside the shared scroll area', async () => {
    const { wrapper } = await mountAppTabs();

    const scrollArea = wrapper.get('[data-testid="app-scroll"]');
    const bottomNav = wrapper.get('[data-testid="bottom-nav"]');

    expect(scrollArea.find('[data-testid="bottom-nav"]').exists()).toBe(false);
    expect(bottomNav.exists()).toBe(true);
  });

  it('switches tabs by routing instead of local component state', async () => {
    const { wrapper, router } = await mountAppTabs();

    await wrapper.get('[data-testid="nav-journal"]').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/journal');
  });
});