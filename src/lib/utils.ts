import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptLanyardData(name: string, variant: string): string {
  if (!name) return "";
  const payload = JSON.stringify({ name, variant });
  return btoa(encodeURIComponent(payload));
}

export function decryptLanyardData(encoded: string): { name: string; variant: string } | null {
  if (!encoded) return null;
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to decrypt lanyard data", e);
    return null;
  }
}
