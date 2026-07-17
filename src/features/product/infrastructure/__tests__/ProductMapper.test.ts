import { mapProduct, mapProductDetail } from "../ProductMapper";
import type {
  ProductApiResponse,
  ProductDetailApiResponse,
} from "../ProductApiResponse";

const baseResponse: ProductApiResponse = {
  id: "abc",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  imgUrl: "https://example.com/iphone.jpg",
};

describe("mapProduct", () => {
  it("maps all base fields correctly", () => {
    const result = mapProduct(baseResponse);

    expect(result).toEqual({
      id: "abc",
      brand: "Apple",
      model: "iPhone 14",
      price: 999,
      imageUrl: "https://example.com/iphone.jpg",
    });
  });

  it("maps empty price to null", () => {
    const result = mapProduct({
      ...baseResponse,
      price: "",
    });

    expect(result.price).toBeNull();
  });

  it("converts price string to number", () => {
    const result = mapProduct({
      ...baseResponse,
      price: "1299",
    });

    expect(result.price).toBe(1299);
  });
});


describe("mapProductDetail", () => {
  const detailResponse: ProductDetailApiResponse = {
    ...baseResponse,

    os: "iOS 16",
    cpu: "A15 Bionic",

    sim: [
      "Single SIM",
      "Nano-SIM",
    ],

    internalMemory: [
      "128 GB",
      "256 GB",
    ],

    colors: [
      "Black",
      "White",
    ],

    wlan: [
      "Wi-Fi 6",
      "Hotspot",
    ],

    bluetooth: [
      "5.3",
      "A2DP",
    ],

    sensors: [
      "Face ID",
      "Accelerometer",
    ],

    dimentions:
      "147.5 x 71.5 x 7.8 mm",

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


  it("maps base fields correctly", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.id).toBe("abc");
    expect(result.brand).toBe("Apple");
    expect(result.model).toBe("iPhone 14");
    expect(result.price).toBe(999);
    expect(result.imageUrl).toBe(
      "https://example.com/iphone.jpg"
    );
  });


  it("maps platform fields", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.os).toBe("iOS 16");
    expect(result.cpu).toBe("A15 Bionic");
  });


  it("maps internal memory", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.internalMemory).toEqual([
      "128 GB",
      "256 GB",
    ]);
  });


  it("maps purchase colors", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.options.colors).toEqual([
      {
        code: 1000,
        name: "Black",
      },
      {
        code: 1001,
        name: "White",
      },
    ]);
  });


  it("maps purchase storages", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.options.storages).toEqual([
      {
        code: 2000,
        name: "128 GB",
      },
      {
        code: 2001,
        name: "256 GB",
      },
    ]);
  });


  it("normalises API arrays into strings", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.sim).toBe(
      "Single SIM, Nano-SIM"
    );

    expect(result.wlan).toBe(
      "Wi-Fi 6, Hotspot"
    );

    expect(result.bluetooth).toBe(
      "5.3, A2DP"
    );

    expect(result.sensors).toBe(
      "Face ID, Accelerometer"
    );
  });


  it("normalises API typo dimentions -> dimensions", () => {
    const result = mapProductDetail(detailResponse);

    expect(result.dimensions).toBe(
      "147.5 x 71.5 x 7.8 mm"
    );
  });


  it("defaults missing optional values", () => {
    const result = mapProductDetail(baseResponse);

    expect(result.os).toBeNull();
    expect(result.cpu).toBeNull();
    expect(result.networkTechnology).toBeNull();
  });


  it("defaults arrays and options", () => {
    const result = mapProductDetail(baseResponse);

    expect(result.internalMemory).toEqual([]);

    expect(result.options).toEqual({
      colors: [],
      storages: [],
    });
  });
});