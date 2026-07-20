import type { ProductDetail } from "../../domain/Product";

export type SpecKey = keyof ProductDetail;

export const SPEC_GROUPS: [string, SpecKey][] = [
  ["Network", "networkTechnology"],
  ["Network Speed", "networkSpeed"],
  ["OS", "os"],
  ["CPU", "cpu"],
  ["Chipset", "chipset"],
  ["GPU", "gpu"],
  ["RAM", "ram"],
  ["Display", "displayType"],
  ["Resolution", "displayResolution"],
  ["Size", "displaySize"],
  ["SIM", "sim"],
  ["Dimensions", "dimensions"],
  ["Weight", "weight"],
  ["Battery", "battery"],
  ["WLAN", "wlan"],
  ["Bluetooth", "bluetooth"],
  ["GPS", "gps"],
  ["NFC", "nfc"],
  ["USB", "usb"],
  ["Sensors", "sensors"],
  ["Announced", "announced"],
  ["Status", "status"],
];
