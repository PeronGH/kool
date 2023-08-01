import type { KeyPoolSelector } from "./types.ts";

export class KeyPool {
  readonly #selector: KeyPoolSelector;
  #keys: string[];

  constructor(
    keys: string[],
    selector: KeyPoolSelector,
  ) {
    this.#keys = keys;
    this.#selector = selector;
  }

  setKeys(keys: string[]): void {
    this.#keys = [...keys];
  }

  select(): string | null {
    return this.#selector(this.#keys) ?? null;
  }
}
