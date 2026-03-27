import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '@/App.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountSecondaryPage(path: string, fromPath?: string) {
  resetSessionForTests();
  localStorage.clear();
  useSession().register({
    displayName: 'Tester',
    email: 'tester@example.com',
    password: 'password123',
  });

  const router = createAppRouter(createMemoryHistory());

  if (fromPath) {
    router.push(fromPath);
    await router.isReady();
    await router.push(path);
    await flushPromises();
  } else {
    router.push(path);
    await router.isReady();
  }

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  await flushPromises();

  return { router, wrapper };
}

describe('secondary pages', () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionForTests();
  });

  it('renders the journal detail route with hero, tags, ai feedback, favorite toggle, and companion navigation', async () => {
    const { router, wrapper } = await mountSecondaryPage('/journal/journal-1', '/app/journal');

    expect(router.currentRoute.value.fullPath).toBe('/journal/journal-1');
    expect(wrapper.get('[data-testid="journal-detail-page"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="journal-detail-hero"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="journal-detail-tags"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="journal-detail-feedback"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('\u5fc3\u7075\u7684\u5b81\u9759');
    expect(wrapper.text()).toContain('\u5fc3\u7075\u7684\u56de\u54cd');

    const favoriteButton = wrapper.get('[data-testid="journal-detail-favorite"]');
    expect(favoriteButton.attributes('data-state')).toBe('inactive');

    await favoriteButton.trigger('click');
    await flushPromises();

    expect(wrapper.get('[data-testid="journal-detail-favorite"]').attributes('data-state')).toBe('active');

    await wrapper.get('[data-testid="journal-detail-companion"]').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/companion');
  });

  it('renders the healing player route shell inside the shared viewport and keeps history on the healing tab after custom back', async () => {
    const { router, wrapper } = await mountSecondaryPage('/healing/track-1', '/app/healing');

    expect(router.currentRoute.value.fullPath).toBe('/healing/track-1');
    expect(wrapper.get('[data-testid="healing-player-page"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="healing-player-scroll"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Healing Player');

    await wrapper.get('[data-testid="healing-player-back"]').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/healing');

    router.back();
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/healing');
  });
});