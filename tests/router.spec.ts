import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '@/App.vue';
import { resetSessionForTests } from '@/composables/useSession';
import { createAppRouter } from '@/router';

describe('app bootstrap', () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionForTests();
  });

  it('renders the welcome route by default', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('开始你的心灵旅程');
  });

  it('renders onboarding content for the current step route', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/onboarding/2');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('记录情绪，见证成长');
  });

  it('redirects unauthenticated users away from home', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/home');
    await router.isReady();

    mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(router.currentRoute.value.fullPath).toBe('/auth');
  });
});
