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

describe("GetProductsUseCase", () => {
  let useCase: GetProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      getProducts: jest.fn().mockResolvedValue([mockProduct]),
      getProduct: jest.fn(),
    };

    useCase = new GetProductsUseCase(mockRepository);
  });

  it("should call repository.getProducts() once", async () => {
    await useCase.execute();
    expect(mockRepository.getProducts).toHaveBeenCalledTimes(1);
  });

  it("should return the list of products from the repository", async () => {
    const result = await useCase.execute();
    expect(result).toEqual([mockProduct]);
  });

  it("should propagate errors thrown by the repository", async () => {
    mockRepository.getProducts.mockRejectedValueOnce(new Error("Network error"));

    await expect(useCase.execute()).rejects.toThrow("Network error");
  });
});