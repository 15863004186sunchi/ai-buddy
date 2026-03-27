import { ref } from 'vue';

import {
  companionParticipants,
  createInitialCompanionMessages,
  createMockCompanionReply,
  type CompanionMessage,
} from '@/data/companion';

interface CompanionChatStore {
  messages: ReturnType<typeof ref<CompanionMessage[]>>;
  sendLocalMessage: (draft: string) => void;
}

function buildStore(): CompanionChatStore {
  const messages = ref<CompanionMessage[]>(createInitialCompanionMessages());
  const replyIndex = ref(0);

  return {
    messages,
    sendLocalMessage(draft) {
      messages.value.push({
        id: `user-${messages.value.length + 1}`,
        role: 'user',
        author: companionParticipants.user,
        text: draft,
      });

      messages.value.push({
        id: `assistant-${messages.value.length + 1}`,
        role: 'assistant',
        author: companionParticipants.assistant,
        text: createMockCompanionReply(draft, replyIndex.value),
      });

      replyIndex.value += 1;
    },
  };
}

let singleton: CompanionChatStore | null = null;

export function useCompanionChat() {
  singleton ??= buildStore();
  return singleton;
}

export function resetCompanionChatForTests() {
  singleton = null;
}
