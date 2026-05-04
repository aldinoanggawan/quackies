// Brand colors — mirrors CSS variables in index.css.
// Use var(--color-*) in inline styles; use these constants in SVG attributes,
// derived rgba() values, and (future) emotion styled template literals.

// Core brand
export const COLOR_PRIMARY = '#C8960A';
export const COLOR_TEAL = '#3BB88A';
export const COLOR_RED = '#E84060';
export const COLOR_DUCK_YELLOW = '#E8D44A';

// Text / UI
export const COLOR_DARK = '#1A1206';
export const COLOR_MUTED = '#9A8060';
export const COLOR_BORDER = '#F0E4C0';

// Backgrounds
export const COLOR_BG = '#FFFBF0';
export const COLOR_WATER_BG = '#F0F8FF';

// Surface tints — card/tag backgrounds derived from brand palette
export const COLOR_PRIMARY_CARD_BG = '#FFF3D4';
export const COLOR_PRIMARY_TAG_BG = '#FFF4D4';
export const COLOR_WARM_CARD_BG = '#FFF8E8';
export const COLOR_TEAL_CARD_BG = '#F2FBF6';
export const COLOR_WATER_CARD_BG = '#D6EEFA';

// Borders and surfaces derived from brand colors
export const COLOR_PRIMARY_SURFACE = '#FEF6E4';
export const COLOR_PRIMARY_BORDER = '#E4C068';
export const COLOR_TEAL_BORDER = '#A8DDD0';

// Accent variants
export const COLOR_PRIMARY_MUTED = '#C8A84B';

// Converts a hex color to rgba — use for opacity variants of brand colors.
export const alpha = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
