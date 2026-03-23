import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import HomePage from '@/pages/HomePage.vue';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import { createAppRouter } from '@/router';

async function mountHomePage() {
  resetSessionForTests();
  localStorage.clear();
  useSession().register({
    displayName: 'Tester',
    email: 'tester@example.com',
    password: 'password123',
  });

  const router = createAppRouter(createMemoryHistory());
  router.push('/home');
  await router.isReady();

  const wrapper = mount(HomePage, {
    global: {
      plugins: [router],
    },
  });

  return { wrapper, router };
}

describe('home page navigation and media', () => {
  beforeEach(() => {
    resetSessionForTests();
    localStorage.clear();
  });

  it('renders image-based content close to the prototype', async () => {
    const { wrapper } = await mountHomePage();

    expect(wrapper.findAll('img').length).toBeGreaterThanOrEqual(3);
    expect(wrapper.text()).toContain('\u6bcf\u65e5\u56de\u54cd');
    expect(wrapper.text()).toContain('\u4e3a\u4f60\u63a8\u8350');
  });

  it('renders real bottom nav labels instead of question-mark placeholders', async () => {
    const { wrapper } = await mountHomePage();
    const navText = wrapper.get('[data-testid="bottom-nav"]').text();

    expect(navText).toContain('\u9996\u9875');
    expect(navText).toContain('\u966a\u4f34');
    expect(navText).toContain('\u65e5\u8bb0');
    expect(navText).toContain('\u7597\u6108');
    expect(navText).not.toContain('?');
  });

  it('switches tab content when bottom nav items are clicked', async () => {
    const { wrapper } = await mountHomePage();

    await wrapper.get('[data-testid="nav-chat"]').trigger('click');
    expect(wrapper.text()).toContain('\u966a\u4f34\u5bf9\u8bdd');

    await wrapper.get('[data-testid="nav-journal"]').trigger('click');
    expect(wrapper.text()).toContain('\u4eca\u65e5\u65e5\u8bb0');

    await wrapper.get('[data-testid="nav-healing"]').trigger('click');
    expect(wrapper.text()).toContain('\u7597\u6108\u65f6\u523b');
  });

  it('keeps the bottom navigation outside the scrollable content region', async () => {
    const { wrapper } = await mountHomePage();

    const scrollArea = wrapper.get('[data-testid="home-scroll"]');
    const bottomNav = wrapper.get('[data-testid="bottom-nav"]');

    expect(scrollArea.find('[data-testid="bottom-nav"]').exists()).toBe(false);
    expect(bottomNav.exists()).toBe(true);
  });
});