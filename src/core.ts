import type {
  KeyPoolInitializer,
  KeyPoolKeys,
  KeyPoolSelector,
} from "./types.ts";

export class KeyPool {
  readonly #selector: KeyPoolSelector;
  readonly #keys: KeyPoolKeys;

  constructor({ keys, selector }: KeyPoolInitializer) {
    this.#keys = keys;
    this.#selector = selector;
  }

  async select(): Promise<string | null> {
    return await this.#selector(await this.#keys()) ?? null;
  }
}

export class AsyncKeyPool extends KeyPool {}
