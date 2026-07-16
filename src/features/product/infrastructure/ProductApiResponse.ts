export interface ProductApiResponse {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductDetailApiResponse extends ProductApiResponse {
  networkTechnology?: string;
  networkSpeed?: string;
  gprs?: string;
  edge?: string;
  announced?: string;
  status?: string;
  dimentions?: string; // Note: API uses typo "dimentions"
  weight?: string;
  sim?: string;
  displayType?: string;
  displayResolution?: string;
  displaySize?: string;
  os?: string;
  cpu?: string;
  chipset?: string;
  gpu?: string;
  externalMemory?: string;
  internalMemory?: string[];
  ram?: string;
  primaryCamera?: string[] | string;
  secondaryCamera?: string;
  battery?: string;
  batteryTalkTime?: string;
  batteryMusicTime?: string;
  wlan?: string;
  bluetooth?: string;
  gps?: string;
  nfc?: string;
  radioRadio?: string;
  usb?: string;
  sensors?: string;
  colors?: number[];
}