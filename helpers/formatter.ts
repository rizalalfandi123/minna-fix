export const removeUnusedSymbol = (str: string) => {
  return str.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
};

export const removeBlockBracketsAndContent = (str: string) => {
  return str.replace(/\[[^\]]*\]/g, "");
};
