import { GetProductsUseCase } from "../GetProductsUseCase";
import type { ProductRepository } from "../../domain/ProductRepository";
import type { Product } from "../../domain/Product";

const mockProduct: Product = {
  id: "abc123",
  brand: "Apple",
  model: "iPhone 15",
  price: 999,
  imageUrl: "https://example.com/iphone.jpg",
};

const mockRepository: jest.Mocked<ProductRepository> = {
  getProducts: jest.fn().mockResolvedValue([mockProduct]),
  getProduct: jest.fn(),
};

describe("GetProductsUseCase", () => {
  let useCase: GetProductsUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetProductsUseCase(mockRepository);
  });

  it("calls repository.getProducts()", async () => {
    await useCase.execute();
    expect(mockRepository.getProducts).toHaveBeenCalledTimes(1);
  });

  it("returns the list of products from the repository", async () => {
    const result = await useCase.execute();
    expect(result).toEqual([mockProduct]);
  });

  it("propagates errors thrown by the repository", async () => {
    mockRepository.getProducts.mockRejectedValueOnce(new Error("Network error"));
    await expect(useCase.execute()).rejects.toThrow("Network error");
  });
});
