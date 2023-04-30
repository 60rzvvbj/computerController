export function random(l: number, r: number): number {
  return Math.random() * (r - l + 1) + l;
}
export function randomInt(l: number, r: number): number {
  return parseInt(String(random(l, r)));
}
