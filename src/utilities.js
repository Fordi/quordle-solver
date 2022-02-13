export const delay = (t) => new Promise((r) => setTimeout(r, t));

export const colorToType = (cssRgb) => {
  const [r, g, b] = cssRgb.replace(/rgb\(|\)/g, '').split(',').map((a) => parseInt(a, 10) / 255);
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  const l = (cmax + cmin) / 2;
  const s = delta === 0 ? 0 : (delta / (1 - Math.abs(2 * l - 1)));
  if (s < 0.3) return '-';
  let h;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === h) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round((h + 60) % 60);
  if (h >= 0.5 && h <= 1.2) return '?';
  if (h > 1.2 && h <= 3) return '+';
  return '!';
};
