import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

function createMemoryStorage(): Storage {
  const storage = new Map<string, string>();

  return {
    get length() {
      return storage.size;
    },
    clear: () => storage.clear(),
    getItem: (key: string) => storage.get(key) ?? null,
    key: (index: number) => Array.from(storage.keys())[index] ?? null,
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  };
}

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: createMemoryStorage(),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
});

// Mantine 9 Textarea autosize calls document.fonts.addEventListener — jsdom doesn't implement FontFaceSet
if (typeof document !== 'undefined' && !document.fonts) {
  Object.defineProperty(document, 'fonts', {
    writable: true,
    value: {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      ready: Promise.resolve(undefined as unknown as FontFaceSet),
      status: 'loaded' as FontFaceSetLoadStatus,
      size: 0,
      check: () => true,
      load: () => Promise.resolve([]),
      forEach: () => {},
      [Symbol.iterator]: function* () {},
    },
  });
}
