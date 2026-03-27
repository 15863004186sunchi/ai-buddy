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

  it('renders healing category icon labels in Chinese instead of raw English tokens', async () => {
    const { wrapper } = await mountApp('/app/healing');

    expect(wrapper.text()).toContain('\u52a9\u7720');
    expect(wrapper.text()).toContain('\u51a5\u60f3');
    expect(wrapper.text()).toContain('\u767d\u566a');
    expect(wrapper.text()).toContain('\u6668\u5149');
    expect(wrapper.text()).not.toContain('bedtime');
    expect(wrapper.text()).not.toContain('self_improvement');
    expect(wrapper.text()).not.toContain('waves');
    expect(wrapper.text()).not.toContain('wb_sunny');
  });

  it('navigates from home recommendations to existing healing player routes', async () => {
    const { wrapper, router } = await mountApp('/app/home');

    await wrapper.get('[data-testid="home-recommendation-track-1"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-1');

    await router.push('/app/home');
    await flushPromises();

    await wrapper.get('[data-testid="home-recommendation-track-2"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-2');

    await router.push('/app/home');
    await flushPromises();

    await wrapper.get('[data-testid="home-recommendation-track-3"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/healing/track-3');
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

describe('local companion composer interactions', () => {
  function getThreadArticles(wrapper) {
    return wrapper.find('[data-testid="chat-thread"]').findAll('article');
  }

  function getMessagesByAuthor(wrapper, author) {
    return getThreadArticles(wrapper).filter((article) => article.get('span').text() === author);
  }

  it('allows typing into the companion composer', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const input = wrapper.get('[data-testid="chat-input"]');
    await input.setValue('Tell me a story');
    await flushPromises();
    expect((input.element as HTMLInputElement).value).toBe('Tell me a story');
  });

  it('clicking send appends a user message', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    const userMessagesBefore = getMessagesByAuthor(wrapper, '你');

    await chatInput.setValue('How are you?');
    await sendButton.trigger('click');
    await flushPromises();

    const userMessagesAfter = getMessagesByAuthor(wrapper, '你');
    expect(userMessagesAfter.length).toBe(userMessagesBefore.length + 1);
    expect(wrapper.get('[data-testid="chat-thread"]').text()).toContain('How are you?');
  });

  it('clicking send appends a local assistant reply', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const assistantMessagesBefore = getMessagesByAuthor(wrapper, 'SoulEcho');
    const assistantTextsBefore = assistantMessagesBefore.map((article) => article.text());
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('Show me a plan');
    await sendButton.trigger('click');
    await flushPromises();

    const assistantMessagesAfter = getMessagesByAuthor(wrapper, 'SoulEcho');
    expect(assistantMessagesAfter.length).toBe(assistantMessagesBefore.length + 1);
    const latestAssistantMessage = assistantMessagesAfter[assistantMessagesAfter.length - 1];
    const latestText = latestAssistantMessage.text();
    expect(assistantTextsBefore).not.toContain(latestText);
  });

  it('prevents sending when the input is empty', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const userMessagesBefore = getMessagesByAuthor(wrapper, '你');
    const assistantMessagesBefore = getMessagesByAuthor(wrapper, 'SoulEcho');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await sendButton.trigger('click');
    await flushPromises();

    expect(getMessagesByAuthor(wrapper, '你').length).toBe(userMessagesBefore.length);
    expect(getMessagesByAuthor(wrapper, 'SoulEcho').length).toBe(assistantMessagesBefore.length);
  });

  it('prevents sending when the input is whitespace-only', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const userMessagesBefore = getMessagesByAuthor(wrapper, '你');
    const assistantMessagesBefore = getMessagesByAuthor(wrapper, 'SoulEcho');
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('   ');
    await sendButton.trigger('click');
    await flushPromises();

    expect(getMessagesByAuthor(wrapper, '你').length).toBe(userMessagesBefore.length);
    expect(getMessagesByAuthor(wrapper, 'SoulEcho').length).toBe(assistantMessagesBefore.length);
  });

  it('shows placeholder feedback for composer actions', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const actionFeedbackMap: Record<string, string> = {
      'chat-plus': '想要分享更多内容？我们会在这里等待你的故事。',
      'chat-voice': '语音输入尚未开放，敬请期待。',
      'chat-settings': '设置功能正在施工中，暂时无法更改。',
    };

    for (const [testId, expectedFeedback] of Object.entries(actionFeedbackMap)) {
      const button = wrapper.get(`[data-testid="${testId}"]`);
      await button.trigger('click');
      await flushPromises();
      const feedback = wrapper.get('[data-testid="chat-feedback"]');
      expect(feedback.text()).toBe(expectedFeedback);
    }
  });
});
