import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '@/App.vue';
import { router } from '@/router';

describe('app bootstrap', () => {
  it('renders the welcome route by default', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('开始你的心灵旅程');
  });
});
