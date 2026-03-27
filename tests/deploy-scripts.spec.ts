import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function readUtf8(path: string) {
  return readFileSync(path, 'utf8');
}

describe('deployment scripts', () => {
  it('documents and supports a fresh rebuild mode for branch switching deployments', () => {
    const startScript = readUtf8('scripts/start.sh');
    const readme = readUtf8('README.md');

    expect(startScript).toContain('--fresh');
    expect(startScript).toContain('build --no-cache');
    expect(startScript).toContain('up -d --force-recreate');
    expect(readme).toContain('./scripts/start.sh --fresh');
  });
});
