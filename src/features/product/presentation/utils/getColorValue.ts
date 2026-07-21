const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a",
  white: "#ffffff",
  red: "#c0392b",
  blue: "#2980b9",
  green: "#27ae60",
  orange: "#f39c12",
  purple: "#8e44ad",
  silver: "#95a5a6",
  gray: "#808080",
  grey: "#808080",
  pink: "#e91e63",
  gold: "#d4af37",
  yellow: "#f1c40f",
};

const COLOR_ALIASES: Record<string, string> = {
  titanium: "gray",
  graphite: "black",
  mystic: "black",
  gentle: "gray",
  "soft-touch": "black",
  rock: "black",

  wine: "red",
  burgundy: "red",
  cherry: "red",

  lagoon: "blue",
  sky: "blue",

  sunshine: "yellow",
  fragrant: "pink",

  pearl: "white",
  ceramic: "white",
  classic: "white",
  pure: "white",
  essential: "white",

  sandy: "silver",
  metallic: "silver",
  steel: "silver",
};

const getDirectColor = (value: string): string | undefined => {
  const normalized = value.toLowerCase();

  const color = Object.keys(COLOR_MAP).find((colorName) =>
    normalized.includes(colorName)
  );

  return color ? COLOR_MAP[color] : undefined;
};

const getAliasColor = (value: string): string | undefined => {
  const normalized = value.toLowerCase();

  const alias = Object.keys(COLOR_ALIASES).find((aliasName) =>
    normalized.includes(aliasName)
  );

  return alias ? COLOR_MAP[COLOR_ALIASES[alias]] : undefined;
};

const resolveSingleColor = (value: string): string | undefined => {
  return getDirectColor(value) ?? getAliasColor(value);
};

export const getColorValue = (colorName: string): string => {
  const normalized = colorName.toLowerCase();

  /**
   * Handle combinations like:
   * Black/Red
   * Black/Silver
   * White/Blue
   */
  if (normalized.includes("/")) {
    const colors = normalized
      .split("/")
      .map((color) => resolveSingleColor(color))
      .filter(Boolean);

    if (colors.length > 1) {
      return `linear-gradient(135deg, ${colors.join(", ")})`;
    }
  }

  return resolveSingleColor(colorName) ?? "#cccccc";
};