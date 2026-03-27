import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function readUtf8(path: string) {
  return readFileSync(path, 'utf8');
}

describe('source encoding', () => {
  it('keeps user-facing Chinese copy as valid UTF-8 source text', () => {
    const readme = readUtf8('README.md');
    const welcome = readUtf8('src/pages/WelcomePage.vue');
    const onboarding = readUtf8('src/data/onboarding.ts');
    const auth = readUtf8('src/pages/AuthPage.vue');
    const register = readUtf8('src/pages/RegisterPage.vue');
    const companion = readUtf8('src/data/companion.ts');
    const journalTab = readUtf8('src/components/tabs/JournalTab.vue');
    const journalData = readUtf8('src/data/journal.ts');
    const journalDetail = readUtf8('src/pages/JournalDetailPage.vue');
    const healing = readUtf8('src/components/tabs/HealingTab.vue');
    const healingData = readUtf8('src/data/healing.ts');
    const healingPlayer = readUtf8('src/pages/HealingPlayerPage.vue');
    const home = readUtf8('src/data/home.ts');
    const validation = readUtf8('src/lib/validation.ts');

    expect(readme).toContain('AI Buddy 是一个基于 Vue 3 的情绪陪伴 UI 原型还原项目');
    expect(welcome).toContain('\u7ed9\u60c5\u7eea\u4e00\u4e2a\u6e29\u67d4\u7684\u843d\u70b9');
    expect(onboarding).toContain('\u8bb0\u5f55\u60c5\u7eea\uff0c\u89c1\u8bc1\u6210\u957f');
    expect(auth).toContain('\u6b22\u8fce\u56de\u6765');
    expect(register).toContain('\u7acb\u5373\u6ce8\u518c');
    expect(companion).toContain('\u4e8b\u60c5\u592a\u591a\u4e86');
    expect(journalTab).toContain('\u641c\u7d22\u90a3\u4e00\u523b\u7684\u60c5\u611f');
    expect(journalData).toContain('\u5fc3\u60c5\u65e5\u8bb0');
    expect(journalData).toContain('\u5f00\u59cb\u4f60\u7684\u7b2c\u4e00\u7bc7\u65e5\u8bb0');
    expect(journalData).toContain('\u5fc3\u7075\u7684\u5b81\u9759');
    expect(journalDetail).toContain('\u7ee7\u7eed\u5bf9\u8bdd');
    expect(journalDetail).toContain('\u6536\u85cf');
    expect(healing).toContain('\u7597\u6108\u7a7a\u95f4');
    expect(healingData).toContain('\u6797\u95f4\u7ec6\u96e8');
    expect(healingPlayer).toContain('\u51a5\u60f3\u5f15\u5bfc');
    expect(home).toContain('\u5e73\u9759');
    expect(validation).toContain('\u8bf7\u8f93\u5165\u6635\u79f0');
  });
});
