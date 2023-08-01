import { KeyPoolSelector } from "./types.ts";

export const randomSelector: KeyPoolSelector = (keys) => {
  const index = Math.floor(Math.random() * keys.length);
  return keys.at(index);
};

export function makeLRUSelector(): KeyPoolSelector {
  const frequencies = new Map();

  return (keys) => {
    let min = Infinity;
    let minKey: string | undefined;

    for (const key of keys) {
      const frequency = frequencies.get(key) ?? 0;

      if (frequency < min) {
        min = frequency;
        minKey = key;
      }
    }

    if (minKey === undefined) return null;

    frequencies.set(minKey, min + 1);
    return minKey;
  };
}
