import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getRandomIndex = <T,>(array: T[]): number => Math.floor(Math.random() * array.length);
