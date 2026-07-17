import { LocalStorageCache } from "../cache/LocalStorageCache";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] ?? null,

    setItem: (key: string, value: string) => {
      store[key] = value;
    },

    removeItem: (key: string) => {
      delete store[key];
    },

    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});


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
    cache.set("key", {
      foo: "bar",
    });

    expect(cache.get("key")).toEqual({
      foo: "bar",
    });
  });


  it("returns null and removes the entry when cache expires", () => {
    const shortCache = new LocalStorageCache(0);

    shortCache.set(
      "key",
      "value"
    );

    expect(shortCache.get("key")).toBeNull();

    expect(
      localStorageMock.getItem("key")
    ).toBeNull();
  });


  it("handles invalid JSON in localStorage gracefully", () => {
    localStorageMock.setItem(
      "bad",
      "not-valid-json"
    );

    expect(
      cache.get("bad")
    ).toBeNull();
  });


  it("overwrites an existing value with a new set()", () => {
    cache.set(
      "key",
      "first"
    );

    cache.set(
      "key",
      "second"
    );

    expect(
      cache.get("key")
    ).toBe("second");
  });


  it("stores different data types correctly", () => {
    cache.set(
      "str",
      "hello"
    );

    cache.set(
      "num",
      42
    );

    cache.set(
      "arr",
      [1, 2, 3]
    );

    cache.set(
      "obj",
      {
        a: 1,
      }
    );


    expect(
      cache.get("str")
    ).toBe("hello");


    expect(
      cache.get("num")
    ).toBe(42);


    expect(
      cache.get("arr")
    ).toEqual([
      1,
      2,
      3,
    ]);


    expect(
      cache.get("obj")
    ).toEqual({
      a: 1,
    });
  });


  it("ignores localStorage write errors", () => {
    const originalSetItem = localStorageMock.setItem;

    localStorageMock.setItem = () => {
      throw new Error("Storage full");
    };


    expect(() => {
      cache.set(
        "key",
        "value"
      );
    }).not.toThrow();


    localStorageMock.setItem = originalSetItem;
  });
});