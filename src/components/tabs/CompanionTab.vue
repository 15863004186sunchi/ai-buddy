<template>
  <section class="companion-tab">
    <header class="companion-tab__header">
      <div>
        <p class="companion-tab__brand">{{ companionHeader.title }}</p>
        <p class="companion-tab__time">{{ companionHeader.timestamp }}</p>
      </div>
      <button
        type="button"
        class="companion-tab__settings"
        data-testid="chat-settings"
        @click="showFeedback(companionFeedbackMessages.settings)"
      >
        {{ composerActions.settings }}
      </button>
    </header>

    <section class="companion-tab__thread" data-testid="chat-thread">
      <article
        v-for="message in threadMessages"
        :key="message.id"
        class="companion-tab__message"
        :class="message.role === 'user' ? 'companion-tab__message--user' : 'companion-tab__message--assistant'"
        data-testid="chat-message"
        :data-role="message.role"
      >
        <span class="companion-tab__author">{{ message.author }}</span>
        <div class="companion-tab__bubble">
          <p data-testid="chat-message-text">{{ message.text }}</p>
          <div v-if="message.steps" class="companion-tab__steps">
            <div v-for="(step, index) in message.steps" :key="step" class="companion-tab__step">
              <span>{{ index + 1 }}</span>
              <strong>{{ step }}</strong>
            </div>
          </div>
          <p v-if="message.closing" class="companion-tab__closing">{{ message.closing }}</p>
        </div>
      </article>
    </section>

    <div class="companion-tab__status">{{ companionHeader.status }}</div>

    <div class="companion-tab__composer" data-testid="chat-composer">
      <button
        type="button"
        class="companion-tab__composer-icon"
        data-testid="chat-plus"
        @click="showFeedback(companionFeedbackMessages.plus)"
      >
        {{ composerActions.plus }}
      </button>
      <input
        v-model="draftMessage"
        class="companion-tab__composer-input"
        data-testid="chat-input"
        :placeholder="composerActions.placeholder"
        type="text"
      />
      <button
        type="button"
        class="companion-tab__composer-icon"
        data-testid="chat-voice"
        @click="showFeedback(companionFeedbackMessages.voice)"
      >
        {{ composerActions.voice }}
      </button>
      <button type="button" class="companion-tab__composer-send" data-testid="chat-send" @click="sendMessage">
        {{ composerActions.send }}
      </button>
    </div>

    <p class="companion-tab__feedback" data-testid="chat-feedback" aria-live="polite">
      {{ feedbackMessage }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useCompanionChat } from '@/composables/useCompanionChat';
import {
  companionFeedbackMessages,
  companionHeader,
  composerActions,
} from '@/data/companion';
const { messages: threadMessages, sendLocalMessage } = useCompanionChat();
const draftMessage = ref('');
const feedbackMessage = ref('');

function showFeedback(message: string) {
  feedbackMessage.value = message;
}

function sendMessage() {
  const trimmedDraft = draftMessage.value.trim();

  if (!trimmedDraft) {
    showFeedback(companionFeedbackMessages.emptyDraft);
    return;
  }

  sendLocalMessage(trimmedDraft);
  draftMessage.value = '';
  feedbackMessage.value = '';
}
</script>

<style scoped>
.companion-tab {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: 1rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.companion-tab__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.companion-tab__brand {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-primary);
}

.companion-tab__time,
.companion-tab__status {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.companion-tab__settings {
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.65rem 0.95rem;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text-muted);
  cursor: pointer;
}

.companion-tab__thread {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.companion-tab__message {
  display: grid;
  gap: 0.4rem;
  max-width: 88%;
}

.companion-tab__message--user {
  justify-self: end;
}

.companion-tab__author {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.companion-tab__message--user .companion-tab__author {
  color: var(--color-secondary);
  justify-self: end;
}

.companion-tab__bubble {
  display: grid;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: 24px;
  line-height: 1.65;
  background: rgba(161, 144, 245, 0.2);
  color: var(--color-text);
}

.companion-tab__message--user .companion-tab__bubble {
  background: rgba(255, 219, 204, 0.7);
}

.companion-tab__bubble p {
  margin: 0;
}

.companion-tab__steps {
  display: grid;
  gap: 0.65rem;
}

.companion-tab__step {
  display: grid;
  grid-template-columns: 1.75rem 1fr;
  gap: 0.75rem;
  align-items: center;
  padding: 0.7rem 0.8rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.55);
}

.companion-tab__step span {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(97, 80, 176, 0.14);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary);
}

.companion-tab__step strong {
  font-size: 0.92rem;
  color: var(--color-text);
}

.companion-tab__closing {
  font-style: italic;
}

.companion-tab__composer {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.55rem;
  align-items: center;
  padding: 0.75rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 32px rgba(48, 51, 48, 0.08);
}

.companion-tab__composer-input {
  width: 100%;
  border: none;
  padding: 0.85rem 1rem;
  border-radius: 18px;
  background: rgba(244, 244, 240, 0.9);
  color: var(--color-text);
}

.companion-tab__composer-input:focus {
  outline: none;
}

.companion-tab__composer-input::placeholder {
  color: var(--color-text-muted);
}

.companion-tab__composer-icon,
.companion-tab__composer-send {
  border: none;
  border-radius: 999px;
  padding: 0.8rem 0.9rem;
  cursor: pointer;
}

.companion-tab__composer-icon {
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text-muted);
}

.companion-tab__composer-send {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
  color: white;
}

.companion-tab__feedback {
  min-height: 1.25rem;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}
</style>
