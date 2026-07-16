export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number | null;
  imageUrl: string;
}

export interface ProductDetail extends Product {
  // Network
  networkTechnology: string | null;
  networkSpeed: string | null;
  gprs: string | null;
  edge: string | null;
  // Launch
  announced: string | null;
  status: string | null;
  // Body
  dimensions: string | null;
  weight: string | null;
  sim: string | null;
  // Display
  displayType: string | null;
  displayResolution: string | null;
  displaySize: string | null;
  // Platform
  os: string | null;
  cpu: string | null;
  chipset: string | null;
  gpu: string | null;
  // Memory
  externalMemory: string | null;
  internalMemory: string[];
  ram: string | null;
  // Camera
  primaryCamera: string[] | string | null;
  secondaryCamera: string | null;
  // Battery
  battery: string | null;
  batteryTalkTime: string | null;
  batteryMusicTime: string | null;
  // Connectivity
  wlan: string | null;
  bluetooth: string | null;
  gps: string | null;
  nfc: string | null;
  radioRadio: string | null;
  usb: string | null;
  // Features
  sensors: string | null;
  colors: number[];
}