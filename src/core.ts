import type { MaybePromise } from "./utils.ts";

export type KeyPoolSelector = (
  keys: string[],
) => MaybePromise<string | null | undefined>;

export type KeyPoolKeys = () => MaybePromise<string[]>;

export type KeyPoolInitializer = {
  selector: KeyPoolSelector;
  keys: KeyPoolKeys;
};

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
