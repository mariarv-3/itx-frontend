import type { Product, ProductDetail } from "../domain/Product";
import type {ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";


function normalizeValue(value?: string | string[] | null): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    const normalized = value.filter(Boolean).join(", ");

    return normalized || null;
  }

  return value.trim() || null;
}


function normalizePrice(price?: string | null): number | null {
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
    networkTechnology: normalizeValue(product.networkTechnology),
    networkSpeed: normalizeValue(product.networkSpeed),
    gprs: normalizeValue(product.gprs),
    edge: normalizeValue(product.edge),

    // Launch
    announced: normalizeValue(product.announced),
    status: normalizeValue(product.status),

    // Body
    dimensions: normalizeValue(product.dimentions),
    weight: normalizeValue(product.weight),
    sim: normalizeValue(product.sim),

    // Display
    displayType: normalizeValue(product.displayType),
    displayResolution: normalizeValue(product.displayResolution),
    displaySize: normalizeValue(product.displaySize),

    // Platform
    os: normalizeValue(product.os),
    cpu: normalizeValue(product.cpu),
    chipset: normalizeValue(product.chipset),
    gpu: normalizeValue(product.gpu),

    // Memory
    externalMemory: normalizeValue(product.externalMemory),
    internalMemory: product.internalMemory ?? [],
    ram: normalizeValue(product.ram),

    // Camera
    primaryCamera: normalizeValue(product.primaryCamera),
    secondaryCamera: normalizeValue(product.secondaryCamera),

    // Battery
    battery: normalizeValue(product.battery),
    batteryTalkTime: normalizeValue(product.batteryTalkTime),
    batteryMusicTime: normalizeValue(product.batteryMusicTime),

    // Connectivity
    wlan: normalizeValue(product.wlan),
    bluetooth: normalizeValue(product.bluetooth),
    gps: normalizeValue(product.gps),
    nfc: normalizeValue(product.nfc),
    radio: normalizeValue(product.radio),
    usb: normalizeValue(product.usb),

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