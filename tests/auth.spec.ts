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

    expect(wrapper.text()).toContain('创建你的专属陪伴');
    expect(wrapper.find('input[name="displayName"]').exists()).toBe(true);
  });

  it('shows validation messages for invalid register submission', async () => {
    const { wrapper } = await mountAuthPage();

    await wrapper.get('[data-testid="auth-tab-register"]').trigger('click');
    await wrapper.get('input[name="email"]').setValue('bad-email');
    await wrapper.get('input[name="password"]').setValue('123');
    await wrapper.get('input[name="confirmPassword"]').setValue('456');
    await wrapper.get('[data-testid="auth-form"]').trigger('submit');

    expect(wrapper.text()).toContain('请输入昵称');
    expect(wrapper.text()).toContain('请输入有效的邮箱地址');
    expect(wrapper.text()).toContain('密码至少需要 8 位');
    expect(wrapper.text()).toContain('两次输入的密码不一致');
  });

  it('navigates to home after valid register submission', async () => {
    const { router, wrapper } = await mountAuthPage();

    await wrapper.get('[data-testid="auth-tab-register"]').trigger('click');
    await wrapper.get('input[name="displayName"]').setValue('小满');
    await wrapper.get('input[name="email"]').setValue('xiaoman@example.com');
    await wrapper.get('input[name="password"]').setValue('password123');
    await wrapper.get('input[name="confirmPassword"]').setValue('password123');
    await wrapper.get('[data-testid="auth-form"]').trigger('submit');
    await flushPromises();

    expect(useSession().user.value?.displayName).toBe('小满');
    expect(router.currentRoute.value.fullPath).toBe('/home');
  });
});
