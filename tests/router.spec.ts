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

    expect(wrapper.text()).toContain('\u8fdb\u5165\u4f53\u9a8c');
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

    expect(wrapper.text()).toContain('\u8bb0\u5f55\u60c5\u7eea\uff0c\u89c1\u8bc1\u6210\u957f');
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