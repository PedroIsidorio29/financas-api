export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function nonEmpty(value: unknown): boolean {
  return !!value
}

export function minLength(value: unknown, qnt: number): boolean {
  if (typeof qnt !== "number") return false
  return String(value).length >= qnt
}

export function maxLength(value: unknown, qnt: number): boolean {
  if (typeof qnt !== "number") return false
  return String(value).length <= qnt
}