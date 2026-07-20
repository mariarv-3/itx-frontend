export interface ProductApiResponse {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductDetailApiResponse
  extends ProductApiResponse {

  // Network
  networkTechnology?: string;
  networkSpeed?: string;
  gprs?: string;
  edge?: string;

  // Launch
  announced?: string;
  status?: string;

  // Body
  // API typo: "dimentions"
  dimentions?: string;
  weight?: string;
  sim?: string | string[];

  // Display
  displayType?: string;
  displayResolution?: string;
  displaySize?: string;

  // Platform
  os?: string;
  cpu?: string;
  chipset?: string;
  gpu?: string;

  // Memory
  externalMemory?: string;
  internalMemory?: string[];
  ram?: string;

  // Camera
  primaryCamera?: string[] | string;
  secondaryCamera?: string;

  // Battery
  battery?: string;
  batteryTalkTime?: string;
  batteryMusicTime?: string;

  // Connectivity
  wlan?: string | string[];
  bluetooth?: string | string[];
  gps?: string;
  nfc?: string;
  radio?: string | string[];
  usb?: string;

  // Features
  sensors?: string | string[];

  colors?: string[];

  // Purchase options
  options?: ProductOptionsApiResponse;
}

export interface ProductOptionsApiResponse {
  colors: ColorApiResponse[];
  storages: StorageApiResponse[];
}

export interface ColorApiResponse {
  code: number;
  name: string;
}

export interface StorageApiResponse {
  code: number;
  name: string;
}