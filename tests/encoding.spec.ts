import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function readUtf8(path: string) {
  return readFileSync(path, 'utf8');
}

describe('source encoding', () => {
  it('keeps user-facing Chinese copy as valid UTF-8 source text', () => {
    const welcome = readUtf8('src/pages/WelcomePage.vue');
    const onboarding = readUtf8('src/data/onboarding.ts');
    const auth = readUtf8('src/pages/AuthPage.vue');
    const home = readUtf8('src/data/home.ts');
    const validation = readUtf8('src/lib/validation.ts');

    expect(welcome).toContain('\u7ed9\u60c5\u7eea\u4e00\u4e2a\u6e29\u67d4\u7684\u843d\u70b9');
    expect(onboarding).toContain('\u8bb0\u5f55\u60c5\u7eea\uff0c\u89c1\u8bc1\u6210\u957f');
    expect(auth).toContain('\u521b\u5efa\u4f60\u7684\u4e13\u5c5e\u966a\u4f34');
    expect(home).toContain('\u5e73\u9759');
    expect(validation).toContain('\u8bf7\u8f93\u5165\u6635\u79f0');
  });
});