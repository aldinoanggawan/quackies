export const withOpacity = (color: string, opacity: number): string =>
  'color-mix(in srgb, ' + color + ' ' + opacity * 100 + '%, transparent)';
