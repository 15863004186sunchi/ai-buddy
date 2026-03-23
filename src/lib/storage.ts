export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function readJson<T>(storage: StorageLike, key: string): T | null {
  const raw = storage.getItem(key);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJson<T>(storage: StorageLike, key: string, value: T) {
  storage.setItem(key, JSON.stringify(value));
}
