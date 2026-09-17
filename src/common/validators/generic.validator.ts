export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function nonEmpty(value: unknown): boolean {
  return !!value
}

export function minLength(qnt: number, value: unknown): boolean {
  return String(value).length >= qnt
}

export function maxLength(qnt: number, value: unknown): boolean {
  return String(value).length <= qnt
}