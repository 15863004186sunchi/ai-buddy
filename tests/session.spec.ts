import { beforeEach, describe, expect, it } from 'vitest';

import { SESSION_STORAGE_KEY, createSessionStore } from '@/composables/useSession';

describe('session store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('hydrates an existing mock session from localStorage', () => {
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        displayName: 'Xiaoman',
        email: 'xiaoman@example.com',
      }),
    );

    const session = createSessionStore(window.localStorage);

    expect(session.isAuthenticated.value).toBe(true);
    expect(session.user.value?.displayName).toBe('Xiaoman');
  });

  it('persists and clears the mock session', () => {
    const session = createSessionStore(window.localStorage);

    session.login({
      email: 'traveler@example.com',
      password: 'password123',
    });

    expect(session.user.value?.displayName).toBe('traveler');
    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toContain('traveler@example.com');

    session.logout();

    expect(session.isAuthenticated.value).toBe(false);
    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });
});