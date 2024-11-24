export function sum(a: number, b: number): number {
  if (globalThis.CHECK_IF_ISOLATED) {
    throw new Error("Test case was not isolated");
  }

  globalThis.CHECK_IF_ISOLATED = true;
  return a + b;
}
