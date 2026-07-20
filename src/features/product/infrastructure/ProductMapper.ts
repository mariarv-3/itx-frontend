import type { Product, ProductDetail } from "../domain/Product";
import type { ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";



function normalizeValue(value?: string | string[]): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return Array.isArray(value)
    ? value.join(", ")
    : value;
}


function normalizePrice(price?: string): number | null {
  if (!price) {
    return null;
  }

  const value = Number(price);

  return Number.isNaN(value)
    ? null
    : value;
}


export function mapProduct(product: ProductApiResponse): Product {
  return {
    id: product.id,
    brand: product.brand,
    model: product.model,
    price: normalizePrice(product.price),
    imageUrl: product.imgUrl,
  };
}


export function mapProductDetail(product: ProductDetailApiResponse): ProductDetail {
  return {
    ...mapProduct(product),

    // Network
    networkTechnology: product.networkTechnology ?? null,
    networkSpeed: product.networkSpeed ?? null,
    gprs: product.gprs ?? null,
    edge: product.edge ?? null,

    // Launch
    announced: product.announced ?? null,
    status: product.status ?? null,

    // Body
    dimensions: product.dimentions ?? null,
    weight: product.weight ?? null,
    sim: normalizeValue(product.sim),

    // Display
    displayType: product.displayType ?? null,
    displayResolution: product.displayResolution ?? null,
    displaySize: product.displaySize ?? null,

    // Platform
    os: product.os ?? null,
    cpu: product.cpu ?? null,
    chipset: product.chipset ?? null,
    gpu: product.gpu ?? null,

    // Memory
    externalMemory: product.externalMemory ?? null,
    internalMemory: product.internalMemory ?? [],
    ram: product.ram ?? null,

    // Camera
    primaryCamera: normalizeValue(product.primaryCamera),
    secondaryCamera: product.secondaryCamera ?? null,

    // Battery
    battery: product.battery ?? null,
    batteryTalkTime: product.batteryTalkTime ?? null,
    batteryMusicTime: product.batteryMusicTime ?? null,

    // Connectivity
    wlan: normalizeValue(product.wlan),
    bluetooth: normalizeValue(product.bluetooth),
    gps: product.gps ?? null,
    nfc: product.nfc ?? null,
    radio: normalizeValue(product.radio),
    usb: product.usb ?? null,

    // Features
    sensors: normalizeValue(product.sensors),
    colors: product.colors ?? [],

    // Purchase options
    options: {
      colors: product.options?.colors ?? [],
      storages: product.options?.storages ?? [],
    },
  };
}