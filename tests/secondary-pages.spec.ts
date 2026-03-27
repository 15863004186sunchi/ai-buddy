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

  it('renders the journal detail route with hero, tags, feedback, action placeholders, favorite toggle, and stable back navigation', async () => {
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
    expect(favoriteButton.attributes('aria-pressed')).toBe('false');

    await favoriteButton.trigger('click');
    await flushPromises();

    expect(wrapper.get('[data-testid="journal-detail-favorite"]').attributes('data-state')).toBe('active');
    expect(wrapper.get('[data-testid="journal-detail-favorite"]').attributes('aria-pressed')).toBe('true');

    await wrapper.get('[data-testid="journal-detail-edit"]').trigger('click');
    await flushPromises();
    expect(wrapper.get('[data-testid="journal-detail-action-feedback"]').text()).toContain('\u7f16\u8f91\u529f\u80fd\u5c06\u5728\u4e0b\u4e00\u9636\u6bb5\u5f00\u653e');

    await wrapper.get('[data-testid="journal-detail-delete"]').trigger('click');
    await flushPromises();
    expect(wrapper.get('[data-testid="journal-detail-action-feedback"]').text()).toContain('\u5220\u9664\u529f\u80fd\u5c06\u5728\u4e0b\u4e00\u9636\u6bb5\u5f00\u653e');

    await wrapper.get('[data-testid="journal-detail-back"]').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/journal');

    router.back();
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/journal');
  });

  it('routes the journal companion cta to the companion tab', async () => {
    const { router, wrapper } = await mountSecondaryPage('/journal/journal-1', '/app/journal');

    await wrapper.get('[data-testid="journal-detail-companion"]').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/app/companion');
  });

  it('redirects unknown journal ids back to the journal tab', async () => {
    const { router, wrapper } = await mountSecondaryPage('/journal/unknown-entry');

    expect(router.currentRoute.value.fullPath).toBe('/app/journal');
    expect(wrapper.find('[data-testid="journal-detail-page"]').exists()).toBe(false);
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