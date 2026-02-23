import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Focus ring utility matching the luxury theme
export const focusRing = cn(
    "focus-visible:outline-none focus-visible:ring-1",
    "focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
);

// Disabled utility
export const disabled = "disabled:pointer-events-none disabled:opacity-30";
