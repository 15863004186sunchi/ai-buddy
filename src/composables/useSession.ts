import { computed, ref } from 'vue';

import type { StorageLike } from '@/lib/storage';
import { readJson, writeJson } from '@/lib/storage';

export const SESSION_STORAGE_KEY = 'ai-buddy-session';

export interface SessionUser {
  displayName: string;
  email: string;
}

interface SessionStore {
  user: ReturnType<typeof ref<SessionUser | null>>;
  isAuthenticated: ReturnType<typeof computed<boolean>>;
  login: (payload: { email: string; password: string }) => void;
  register: (payload: { displayName: string; email: string; password: string }) => void;
  logout: () => void;
}

function buildStore(storage: StorageLike): SessionStore {
  const user = ref<SessionUser | null>(readJson<SessionUser>(storage, SESSION_STORAGE_KEY));
  const isAuthenticated = computed(() => Boolean(user.value));

  const persist = (nextUser: SessionUser | null) => {
    user.value = nextUser;

    if (nextUser) {
      writeJson(storage, SESSION_STORAGE_KEY, nextUser);
      return;
    }

    storage.removeItem(SESSION_STORAGE_KEY);
  };

  return {
    user,
    isAuthenticated,
    login(payload) {
      const displayName = payload.email.split('@')[0] || '旅伴';
      persist({
        displayName,
        email: payload.email,
      });
    },
    register(payload) {
      persist({
        displayName: payload.displayName,
        email: payload.email,
      });
    },
    logout() {
      persist(null);
    },
  };
}

export function createSessionStore(storage: StorageLike = window.localStorage) {
  return buildStore(storage);
}

let singleton: SessionStore | null = null;

export function useSession() {
  singleton ??= buildStore(window.localStorage);
  return singleton;
}

export function resetSessionForTests() {
  singleton = null;
}
