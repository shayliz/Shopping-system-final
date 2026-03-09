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

const fallbackByName: Record<string, string> = {
  'portable bluetooth speaker': createPlaceholderImage(
    'Portable Bluetooth Speaker'
  ),
  'portable power bank': createPlaceholderImage('Portable Power Bank'),
};

export function getProductImageSrc(name: string, imageUrl: string): string {
  if (imageUrl && imageUrl.trim().length > 0) {
    return imageUrl;
  }

  return (
    fallbackByName[name.trim().toLowerCase()] || createPlaceholderImage(name)
  );
}

export function onProductImageError(
  event: SyntheticEvent<HTMLImageElement>,
  name: string
) {
  const image = event.currentTarget;
  const fallback =
    fallbackByName[name.trim().toLowerCase()] || createPlaceholderImage(name);

  if (image.src !== fallback) {
    image.src = fallback;
  }
}
