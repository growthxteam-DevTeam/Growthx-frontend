import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`
}

/**
 * Exhaustiveness helper for `switch` statements over a union type.
 * TypeScript will refuse to compile the call site if a case is missing,
 * so a new member added to the union surfaces as a build error rather
 * than a silent runtime gap.
 */
export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}
