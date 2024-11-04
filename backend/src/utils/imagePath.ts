import path from 'path';

export function generateImagePath(nome: string, originalFileName: string): string {
  const timestamp = Date.now();
  return `assets/${nome}_${timestamp}${path.extname(originalFileName)}`;
}
