export const removeUnusedSymbol = (str: string) => {
  return str.replace(/[^\p{L}\p{N}]/gu, "");
};
