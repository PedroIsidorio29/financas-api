export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function nonEmpty(value: unknown): boolean {
  return !!value
}