/**
 * Convert a JSON object to CSS.
 *
 * @param json The JSON object to convert.
 * @returns The CSS string.
 */
export function jsonInCss(json: Partial<CSSStyleDeclaration>) {
  return Object.entries(json)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([property, value]) => `${property}: ${value};`)
    .join(" ");
}