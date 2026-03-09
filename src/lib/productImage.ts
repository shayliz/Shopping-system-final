import type { SyntheticEvent } from 'react';

function createPlaceholderImage(label: string): string {
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#dbeafe"/>
      <stop offset="100%" stop-color="#bfdbfe"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <rect x="90" y="140" width="420" height="320" rx="26" fill="#ffffff" opacity="0.88"/>
  <text x="300" y="305" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#1e3a8a">${safeLabel}</text>
  <text x="300" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#475569">Image unavailable</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const realImageByName: Record<string, string> = {
  'portable bluetooth speaker':
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Bluetooth_Speakers_%2841561673055%29.jpg',
  'portable power bank':
    'https://upload.wikimedia.org/wikipedia/commons/8/83/USB_power_bank.jpg',
};

export function getProductImageSrc(name: string, imageUrl: string): string {
  if (imageUrl && imageUrl.trim().length > 0) {
    return imageUrl;
  }

  const normalizedName = name.trim().toLowerCase();
  return realImageByName[normalizedName] || createPlaceholderImage(name);
}

export function onProductImageError(
  event: SyntheticEvent<HTMLImageElement>,
  name: string
) {
  const image = event.currentTarget;
  const normalizedName = name.trim().toLowerCase();
  const realFallback = realImageByName[normalizedName];
  const placeholderFallback = createPlaceholderImage(name);

  if (realFallback && image.src !== realFallback) {
    image.src = realFallback;
    return;
  }

  if (image.src !== placeholderFallback) {
    image.src = placeholderFallback;
  }
}
