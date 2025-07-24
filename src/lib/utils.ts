import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL state management utilities
export function encodeURLData(data: any): string {
  return encodeURIComponent(JSON.stringify(data));
}

export function decodeURLData(encodedData: string): any {
  try {
    return JSON.parse(decodeURIComponent(encodedData));
  } catch (error) {
    console.error('Error decoding URL data:', error);
    return null;
  }
}

export function createURLParams(params: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object') {
        searchParams.set(key, encodeURLData(value));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  
  return searchParams;
}
