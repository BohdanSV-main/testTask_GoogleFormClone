export function cx(...values: (string | false | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}
