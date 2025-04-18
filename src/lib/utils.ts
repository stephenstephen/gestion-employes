import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const formatDate = (iso: string | null) => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('fr-FR');
};
