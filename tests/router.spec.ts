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

  it('redirects the root path to the welcome route', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/');
    await router.isReady();

    expect(router.currentRoute.value.fullPath).toBe('/welcome');
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

  it('renders the dedicated register route', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/register');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('\u7acb\u5373\u6ce8\u518c');
  });

  it('redirects unauthenticated users from the app shell to auth', async () => {
    const router = createAppRouter(createMemoryHistory());
    router.push('/app/home');
    await router.isReady();

    mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(router.currentRoute.value.fullPath).toBe('/auth');
  });
});