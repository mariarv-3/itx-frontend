import { getColorValue } from "./getColorValue";

describe("getColorValue", () => {
  it.each([
    ["Black", "#1a1a1a"],
    ["Mystic Black", "#1a1a1a"],
    ["Titanium Black", "#1a1a1a"],
    ["White", "#ffffff"],
    ["Classic White", "#ffffff"],
    ["Pure White", "#ffffff"],
    ["Red", "#c0392b"],
    ["Wine red", "#c0392b"],
    ["Burgundy Red", "#c0392b"],
    ["Blue", "#2980b9"],
    ["Sky Blue", "#2980b9"],
    ["Green", "#27ae60"],
    ["Titanium Grey", "#808080"],
    ["Silver", "#95a5a6"],
  ])("returns the correct color for %s", (colorName, expectedColor) => {
    expect(getColorValue(colorName)).toBe(expectedColor);
  });

  it("creates a gradient for combined colors", () => {
    expect(getColorValue("Black/Red")).toBe(
      "linear-gradient(135deg, #1a1a1a, #c0392b)"
    );
  });

  it("returns fallback color for unsupported values", () => {
    expect(getColorValue("Ferrari edition")).toBe("#cccccc");
  });
});