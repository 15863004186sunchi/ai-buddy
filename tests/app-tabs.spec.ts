import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';

import { resetCompanionChatForTests } from '@/composables/useCompanionChat';
import { resetSessionForTests, useSession } from '@/composables/useSession';
import AppTabsPage from '@/pages/AppTabsPage.vue';
import { createAppRouter } from '@/router';

async function mountApp(tab = '/app/home') {
  resetCompanionChatForTests();
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

function getChatMessages(wrapper: Awaited<ReturnType<typeof mountApp>>['wrapper'], role: 'user' | 'assistant') {
  return wrapper.findAll(`[data-testid="chat-message"][data-role="${role}"]`);
}

function getThreadMessages(wrapper: Awaited<ReturnType<typeof mountApp>>['wrapper']) {
  return wrapper.findAll('[data-testid="chat-message"]');
}

describe('app tabs routing', () => {
  beforeEach(() => {
    resetCompanionChatForTests();
    resetSessionForTests();
    localStorage.clear();
  });

  it('renders the home tab for /app/home', async () => {
    const { wrapper } = await mountApp('/app/home');

    expect(wrapper.text()).toContain('\u6bcf\u65e5\u56de\u54cd');
  });

  it('keeps the app shell bottom navigation inside a dedicated viewport bottom region', async () => {
    const { wrapper } = await mountApp('/app/home');

    expect(wrapper.get('[data-testid="app-scroll"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="bottom-nav"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="viewport-bottom"]').find('[data-testid="bottom-nav"]').exists()).toBe(true);
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
  it('allows typing into the companion composer', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const input = wrapper.get('[data-testid="chat-input"]');

    await input.setValue('Tell me a story');
    await flushPromises();

    expect((input.element as HTMLInputElement).value).toBe('Tell me a story');
  });

  it('clicking send appends a user message', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const userMessages = getChatMessages(wrapper, 'user');
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('How are you?');
    await sendButton.trigger('click');
    await flushPromises();

    const updatedUserMessages = getChatMessages(wrapper, 'user');
    expect(updatedUserMessages.length).toBe(userMessages.length + 1);

    const latestUserMessage = updatedUserMessages[updatedUserMessages.length - 1];
    expect(latestUserMessage.get('[data-testid="chat-message-text"]').text()).toBe('How are you?');
  });

  it('clicking send appends a local assistant reply after the user message', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const threadMessages = getThreadMessages(wrapper);
    const assistantMessages = getChatMessages(wrapper, 'assistant');
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('Show me a plan');
    await sendButton.trigger('click');
    await flushPromises();

    const updatedAssistantMessages = getChatMessages(wrapper, 'assistant');
    const appendedMessages = getThreadMessages(wrapper).slice(threadMessages.length);

    expect(updatedAssistantMessages.length).toBe(assistantMessages.length + 1);
    expect(appendedMessages).toHaveLength(2);
    expect(appendedMessages[0].attributes('data-role')).toBe('user');
    expect(appendedMessages[0].get('[data-testid="chat-message-text"]').text()).toBe('Show me a plan');
    expect(appendedMessages[1].attributes('data-role')).toBe('assistant');
    expect(appendedMessages[1].get('[data-testid="chat-message-text"]').text()).not.toBe('');
  });

  it('prevents sending when the input is empty', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const userMessages = getChatMessages(wrapper, 'user');
    const assistantMessages = getChatMessages(wrapper, 'assistant');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await sendButton.trigger('click');
    await flushPromises();

    expect(getChatMessages(wrapper, 'user').length).toBe(userMessages.length);
    expect(getChatMessages(wrapper, 'assistant').length).toBe(assistantMessages.length);
  });

  it('shows feedback when send is clicked with an empty input', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await sendButton.trigger('click');
    await flushPromises();

    expect(wrapper.get('[data-testid="chat-feedback"]').text()).toBe(
      '\u5148\u5199\u70b9\u60f3\u8bf4\u7684\u8bdd\uff0c\u6211\u4f1a\u5728\u8fd9\u91cc\u542c\u4f60\u3002',
    );
  });

  it('prevents sending when the input only contains whitespace', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const userMessages = getChatMessages(wrapper, 'user');
    const assistantMessages = getChatMessages(wrapper, 'assistant');
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('   ');
    await sendButton.trigger('click');
    await flushPromises();

    expect(getChatMessages(wrapper, 'user').length).toBe(userMessages.length);
    expect(getChatMessages(wrapper, 'assistant').length).toBe(assistantMessages.length);
  });

  it('shows placeholder feedback for composer actions without mutating the thread', async () => {
    const { wrapper } = await mountApp('/app/companion');
    const initialThreadCount = getThreadMessages(wrapper).length;
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    await chatInput.setValue('\u5148\u4e0d\u8981\u6539\u52a8\u6211\u7684\u8f93\u5165');

    const expectedFeedback = {
      'chat-plus': '\u6dfb\u52a0\u529f\u80fd\u6682\u672a\u5f00\u653e',
      'chat-voice': '\u8bed\u97f3\u529f\u80fd\u6682\u672a\u5f00\u653e',
      'chat-settings': '\u8bbe\u7f6e\u529f\u80fd\u6682\u672a\u5f00\u653e',
    } as const;

    for (const [testId, feedbackText] of Object.entries(expectedFeedback)) {
      const button = wrapper.get(`[data-testid="${testId}"]`);
      await button.trigger('click');
      await flushPromises();

      expect(wrapper.get('[data-testid="chat-feedback"]').text()).toBe(feedbackText);
      expect(getThreadMessages(wrapper)).toHaveLength(initialThreadCount);
      expect((chatInput.element as HTMLInputElement).value).toBe('\u5148\u4e0d\u8981\u6539\u52a8\u6211\u7684\u8f93\u5165');
    }
  });

  it('keeps sent messages when switching tabs but resets draft and feedback', async () => {
    const { wrapper, router } = await mountApp('/app/companion');
    const initialThreadCount = getThreadMessages(wrapper).length;
    const chatInput = wrapper.get('[data-testid="chat-input"]');
    const sendButton = wrapper.get('[data-testid="chat-send"]');

    await chatInput.setValue('Remember this message');
    await sendButton.trigger('click');
    await flushPromises();

    await chatInput.setValue('This draft should clear');
    await wrapper.get('[data-testid="chat-plus"]').trigger('click');
    await flushPromises();

    await router.push('/app/home');
    await flushPromises();
    await router.push('/app/companion');
    await flushPromises();

    const threadMessages = getThreadMessages(wrapper);
    expect(threadMessages).toHaveLength(initialThreadCount + 2);
    expect(threadMessages[threadMessages.length - 2].attributes('data-role')).toBe('user');
    expect(threadMessages[threadMessages.length - 2].get('[data-testid="chat-message-text"]').text()).toBe(
      'Remember this message',
    );
    expect(threadMessages[threadMessages.length - 1].attributes('data-role')).toBe('assistant');
    expect((wrapper.get('[data-testid="chat-input"]').element as HTMLInputElement).value).toBe('');
    expect(wrapper.get('[data-testid="chat-feedback"]').text()).toBe('');
  });

});
