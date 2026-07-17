import { GetProductUseCase } from "../GetProductUseCase";
import type { ProductRepository } from "../../domain/ProductRepository";
import type { ProductDetail } from "../../domain/Product";


const mockDetail: ProductDetail = {
  id: "xyz789",
  brand: "Samsung",
  model: "Galaxy S24",
  price: 899,
  imageUrl: "https://example.com/s24.jpg",

  networkTechnology: "5G",
  networkSpeed: null,
  gprs: null,
  edge: null,

  announced: "2024 January",
  status: "Available",

  dimensions: null,
  weight: null,
  sim: "Nano-SIM",

  displayType: "AMOLED",
  displayResolution: "2340 x 1080",
  displaySize: "6.2 inches",

  os: "Android 14",
  cpu: "Snapdragon 8 Gen 3",
  chipset: null,
  gpu: null,

  externalMemory: null,
  internalMemory: [
    "128 GB",
    "256 GB",
  ],
  ram: "8 GB",

  primaryCamera: null,
  secondaryCamera: null,

  battery: "4000 mAh",
  batteryTalkTime: null,
  batteryMusicTime: null,

  wlan: "Wi-Fi 6E",
  bluetooth: "5.3",
  gps: "Yes",
  nfc: "Yes",
  radio: null,
  usb: "USB-C 3.2",

  sensors: null,
  colors: ["Black", "White"],

  options: {
    colors: [
      {
        code: 1000,
        name: "Black",
      },
      {
        code: 1001,
        name: "White",
      },
    ],
    storages: [
      {
        code: 2000,
        name: "128 GB",
      },
      {
        code: 2001,
        name: "256 GB",
      },
    ],
  },
};


describe("GetProductUseCase", () => {
  let useCase: GetProductUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;


  beforeEach(() => {
    mockRepository = {
      getProducts: jest.fn(),
      getProduct: jest.fn()
        .mockResolvedValue(mockDetail),
    };

    useCase = new GetProductUseCase(mockRepository);
  });


  it("should call repository.getProduct() with the correct id", async () => {
    await useCase.execute("xyz789");

    expect(mockRepository.getProduct)
      .toHaveBeenCalledWith("xyz789");

    expect(mockRepository.getProduct)
      .toHaveBeenCalledTimes(1);
  });


  it("should return the product detail from repository", async () => {
    const result = await useCase.execute("xyz789");

    expect(result)
      .toEqual(mockDetail);
  });


  it("should propagate repository errors", async () => {
    mockRepository.getProduct
      .mockRejectedValueOnce(new Error("Not found"));


    await expect(
      useCase.execute("bad-id")
    )
      .rejects
      .toThrow("Not found");
  });
});