import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: any): string => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export const formatCurrency = (value: string, currency: string) => {
  return `${value.toLocaleString()} ${currency || 'UZS'}`;
};

export const formatDate = (isoString: any) => {
  const date = new Date(isoString);
  return date.toISOString().replace('T', ' ').substring(0, 16);
};