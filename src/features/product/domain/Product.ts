export interface ColorOption {
  code: number;
  name: string;
}

export interface StorageOption {
  code: number;
  name: string;
}

export interface ProductOptions {
  colors: ColorOption[];
  storages: StorageOption[];
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number | null;
  imageUrl: string;
}

export interface ProductDetail extends Product {
  networkTechnology: string | null;
  networkSpeed: string | null;
  gprs: string | null;
  edge: string | null;

  announced: string | null;
  status: string | null;

  dimensions: string | null;
  weight: string | null;
  sim: string | null;

  displayType: string | null;
  displayResolution: string | null;
  displaySize: string | null;

  os: string | null;
  cpu: string | null;
  chipset: string | null;
  gpu: string | null;

  externalMemory: string | null;
  internalMemory: string[];
  ram: string | null;

  primaryCamera: string | null;
  secondaryCamera: string | null;

  battery: string | null;
  batteryTalkTime: string | null;
  batteryMusicTime: string | null;

  wlan: string | null;
  bluetooth: string | null;
  gps: string | null;
  nfc: string | null;
  radio: string | null;
  usb: string | null;

  sensors: string | null;

  colors: string[];

  options: ProductOptions;
}