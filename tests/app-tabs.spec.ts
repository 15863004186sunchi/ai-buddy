import { flushPromises, mount } from '@vue/test-utils';
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

  it('renders journal as an empty-state page for /app/journal by default', async () => {
    const { wrapper } = await mountApp('/app/journal');

    expect(wrapper.get('[data-testid="journal-empty-state"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="journal-empty-cta"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="journal-list"]').exists()).toBe(false);
    expect(wrapper.text()).toContain('\u5fc3\u60c5\u65e5\u8bb0');
    expect(wrapper.text()).toContain('\u5f00\u59cb\u4f60\u7684\u7b2c\u4e00\u7bc7\u65e5\u8bb0');
  });

  it('renders healing as a discovery page for /app/healing', async () => {
    const { wrapper } = await mountApp('/app/healing');

    expect(wrapper.text()).toContain('\u7597\u6108\u7a7a\u95f4');
    expect(wrapper.get('[data-testid="healing-categories"]').exists()).toBe(true);
  });

  it('navigates from healing discovery entry points to player routes', async () => {
    const { wrapper, router } = await mountApp('/app/healing');

    await wrapper.get('[data-testid="healing-hero-entry"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-1');

    await router.push('/app/healing');
    await flushPromises();

    await wrapper.get('[data-testid="healing-category-meditation"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-2');

    await router.push('/app/healing');
    await flushPromises();

    await wrapper.get('[data-testid="healing-track-track-3"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-3');
  });
});
