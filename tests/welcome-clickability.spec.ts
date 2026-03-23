import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('welcome page clickability', () => {
  it('keeps decorative rings from intercepting pointer events', () => {
    const source = readFileSync('src/pages/WelcomePage.vue', 'utf8');

    expect(source).toContain('.welcome-page__rings');
    expect(source).toContain('pointer-events: none;');
  });
});