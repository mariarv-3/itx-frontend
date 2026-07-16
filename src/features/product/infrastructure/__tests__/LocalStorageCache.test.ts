import { LocalStorageCache } from "../cache/LocalStorageCache";

// Minimal localStorage mock for Node/Jest environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("LocalStorageCache", () => {
  let cache: LocalStorageCache;

  beforeEach(() => {
    localStorageMock.clear();
    cache = new LocalStorageCache();
  });

  it("returns null for a key that has never been set", () => {
    expect(cache.get("missing")).toBeNull();
  });

  it("stores and retrieves a value", () => {
    cache.set("key", { foo: "bar" });
    expect(cache.get("key")).toEqual({ foo: "bar" });
  });

  it("returns null and removes the entry when the cache has expired", () => {
    // Use a very short expiration time (0 ms) so everything is instantly stale
    const shortCache = new LocalStorageCache(0);
    shortCache.set("key", "value");
    // After 0 ms TTL the item is already expired
    expect(shortCache.get("key")).toBeNull();
    expect(localStorageMock.getItem("key")).toBeNull();
  });

  it("handles invalid JSON in localStorage gracefully (returns null)", () => {
    localStorageMock.setItem("bad", "not-valid-json");
    expect(cache.get("bad")).toBeNull();
  });

  it("overwrites an existing value with a new set()", () => {
    cache.set("key", "first");
    cache.set("key", "second");
    expect(cache.get("key")).toBe("second");
  });

  it("stores different types: string, number, array, object", () => {
    cache.set("str", "hello");
    cache.set("num", 42);
    cache.set("arr", [1, 2, 3]);
    cache.set("obj", { a: 1 });

    expect(cache.get("str")).toBe("hello");
    expect(cache.get("num")).toBe(42);
    expect(cache.get("arr")).toEqual([1, 2, 3]);
    expect(cache.get("obj")).toEqual({ a: 1 });
  });
});
