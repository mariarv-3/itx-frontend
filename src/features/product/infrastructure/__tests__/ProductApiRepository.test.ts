import { ProductApiRepository } from "../ProductApiRepository";
import { LocalStorageCache } from "../cache/LocalStorageCache";

describe("ProductApiRepository", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    jest.spyOn(globalThis, "fetch").mockImplementation(
      (_url, options) =>
        new Promise<Response>((_, reject) => {
          options?.signal?.addEventListener("abort", () => {
            reject(
              new DOMException("Request aborted", "AbortError")
            );
          });
        })
    );

    Object.defineProperty(globalThis, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("rejects when the request times out", async () => {
    const repository = new ProductApiRepository(
      new LocalStorageCache()
    );

    const requestPromise = repository.getProducts();

    jest.advanceTimersByTime(8000);

    await expect(requestPromise).rejects.toThrow(
      "Request timed out"
    );
  });
});