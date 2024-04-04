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


/**
 * Create a unique ID.
 */
export function createUniqueId() {
  return (new Date).getTime().toString(36) + Math.random().toString(36).substr(2)
}
