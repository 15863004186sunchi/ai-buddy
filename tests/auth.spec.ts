import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import AuthPage from '@/pages/AuthPage.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountAuthPage() {
  const router = createAppRouter(createMemoryHistory());
  router.push('/auth');
  await router.isReady();

  const wrapper = mount(AuthPage, {
    global: {
      plugins: [router],
    },
  });

  return { router, wrapper };
}

describe('auth page', () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionForTests();
  });

  it('switches from login to register mode', async () => {
    const { wrapper } = await mountAuthPage();

    await wrapper.get('[data-testid="auth-tab-register"]').trigger('click');

    expect(wrapper.text()).toContain('\u521b\u5efa\u4f60\u7684\u4e13\u5c5e\u966a\u4f34');
    expect(wrapper.find('input[name="displayName"]').exists()).toBe(true);
  });

  it('shows validation messages for invalid register submission', async () => {
    const { wrapper } = await mountAuthPage();

    await wrapper.get('[data-testid="auth-tab-register"]').trigger('click');
    await wrapper.get('input[name="email"]').setValue('bad-email');
    await wrapper.get('input[name="password"]').setValue('123');
    await wrapper.get('input[name="confirmPassword"]').setValue('456');
    await wrapper.get('[data-testid="auth-form"]').trigger('submit');

    expect(wrapper.text()).toContain('\u8bf7\u8f93\u5165\u6635\u79f0');
    expect(wrapper.text()).toContain('\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740');
    expect(wrapper.text()).toContain('\u5bc6\u7801\u81f3\u5c11\u9700\u8981 8 \u4f4d');
    expect(wrapper.text()).toContain('\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4');
  });

  it('navigates to home after valid register submission', async () => {
    const { router, wrapper } = await mountAuthPage();

    await wrapper.get('[data-testid="auth-tab-register"]').trigger('click');
    await wrapper.get('input[name="displayName"]').setValue('Xiaoman');
    await wrapper.get('input[name="email"]').setValue('xiaoman@example.com');
    await wrapper.get('input[name="password"]').setValue('password123');
    await wrapper.get('input[name="confirmPassword"]').setValue('password123');
    await wrapper.get('[data-testid="auth-form"]').trigger('submit');
    await flushPromises();

    expect(useSession().user.value?.displayName).toBe('Xiaoman');
    expect(router.currentRoute.value.fullPath).toBe('/home');
  });
});