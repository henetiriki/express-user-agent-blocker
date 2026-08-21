export const loadEsmModule = (specifier: string): Promise<any> => {
  // Keep native dynamic import intact when this TypeScript file is compiled to CommonJS.
  const load = new Function('specifier', 'return import(specifier)')
  return load(specifier)
}
