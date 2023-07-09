import { FilterFn } from "@tanstack/react-table";

export const globalFilter: FilterFn<any> = (row, _, value) => {
  // Rank the item
  const keys = Object.keys(row.original);
  const everyMatch = keys.every(key => {
    const originalValue = row.original[key];
    if (!value[key]) {
      return true;
    }
    if (Array.isArray(value[key])) {
      if (value[key].length === 0) {
        return true;
      }
      if (Array.isArray(originalValue)) {
        if (originalValue.length === 0) {
          return false;
        }
        const matches = originalValue.some(item => {
          const ranked = (value[key] as string[]).map(v => {
            return item === v;
          });
          return ranked.some(r => r);
        });
        return matches;
      } else {
        const ranked = (value[key] as string[]).map(v => {          
          return originalValue === v;
        });
        return ranked.some(r => r);
      }
    }
    const itemRank = originalValue === value[key];
    if (itemRank) {
      return itemRank;
    }
  });

  return everyMatch;
};