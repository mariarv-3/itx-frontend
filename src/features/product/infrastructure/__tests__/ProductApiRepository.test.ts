import { ProductApiRepository } from "../ProductApiRepository";
import { LocalStorageCache } from "../cache/LocalStorageCache";

describe("ProductApiRepository", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


  it("maps a successful response into products", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: "1",
          brand: "Brand",
          model: "Model",
          price: "100",
          imgUrl: "https://example.com/image.jpg",
        },
      ],
    } as Response);

    const repository = new ProductApiRepository(
      new LocalStorageCache()
    );

    await expect(repository.getProducts()).resolves.toEqual([
      expect.objectContaining({
        id: "1",
        brand: "Brand",
        model: "Model",
        price: 100,
        imageUrl: "https://example.com/image.jpg",
      }),
    ]);
  });


  it("stores successful responses in cache", async () => {
    const cache = new LocalStorageCache();

    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const setSpy = jest.spyOn(cache, "set");

    const repository = new ProductApiRepository(cache);

    await repository.getProducts();

    expect(setSpy).toHaveBeenCalledWith(
      "product:list",
      []
    );
  });


  it("returns cached products without requesting the API", async () => {
    const cache = new LocalStorageCache();

    jest.spyOn(cache, "get")
      .mockReturnValue([
        {
          id: "1",
          brand: "Apple",
          model: "iPhone",
          price: "999",
          imgUrl: "image.jpg",
        },
      ]);

    const fetchSpy = jest.spyOn(globalThis, "fetch");

    const repository = new ProductApiRepository(cache);

    await expect(repository.getProducts()).resolves.toEqual([
      expect.objectContaining({
        id: "1",
        brand: "Apple",
      }),
    ]);

    expect(fetchSpy).not.toHaveBeenCalled();
  });


  it("throws when the API returns an error response", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const repository = new ProductApiRepository(
      new LocalStorageCache()
    );

    await expect(repository.getProducts())
      .rejects
      .toThrow("Request failed (500)");
  });


  it("deduplicates simultaneous requests", async () => {
    let resolveRequest!: (value: Response) => void;

    const fetchPromise = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });

    const fetchSpy = jest
      .spyOn(globalThis, "fetch")
      .mockReturnValue(fetchPromise);


    const repository = new ProductApiRepository(
      new LocalStorageCache()
    );


    const firstRequest = repository.getProducts();
    const secondRequest = repository.getProducts();


    resolveRequest({
      ok: true,
      json: async () => [],
    } as Response);


    await Promise.all([
      firstRequest,
      secondRequest,
    ]);


    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});