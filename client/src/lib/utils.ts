import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const server_api = import.meta.env.VITE_SERVER_ROOT_API;

export interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface TableHeader {
  id?: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}
