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

    const repository = new ProductApiRepository(new LocalStorageCache());

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
});