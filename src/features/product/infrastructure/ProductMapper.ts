import type { Product, ProductDetail } from "../domain/Product";
import type { ProductApiResponse, ProductDetailApiResponse } from "./ProductApiResponse";

export function mapProduct(product: ProductApiResponse): Product {
  return {
    id: product.id,
    brand: product.brand,
    model: product.model,
    price: product.price ? Number(product.price) : null,
    imageUrl: product.imgUrl,
  };
}

export function mapProductDetail(product: ProductDetailApiResponse): ProductDetail {
  return {
    // Base fields
    id: product.id,
    brand: product.brand,
    model: product.model,
    price: product.price ? Number(product.price) : null,
    imageUrl: product.imgUrl,
    // Network
    networkTechnology: product.networkTechnology ?? null,
    networkSpeed: product.networkSpeed ?? null,
    gprs: product.gprs ?? null,
    edge: product.edge ?? null,
    // Launch
    announced: product.announced ?? null,
    status: product.status ?? null,
    // Body — note the API typo "dimentions"
    dimensions: product.dimentions ?? null,
    weight: product.weight ?? null,
    sim: product.sim ?? null,
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
    primaryCamera: product.primaryCamera ?? null,
    secondaryCamera: product.secondaryCamera ?? null,
    // Battery
    battery: product.battery ?? null,
    batteryTalkTime: product.batteryTalkTime ?? null,
    batteryMusicTime: product.batteryMusicTime ?? null,
    // Connectivity
    wlan: product.wlan ?? null,
    bluetooth: product.bluetooth ?? null,
    gps: product.gps ?? null,
    nfc: product.nfc ?? null,
    radioRadio: product.radioRadio ?? null,
    usb: product.usb ?? null,
    // Features
    sensors: product.sensors ?? null,
    colors: product.colors ?? [],
  };
}