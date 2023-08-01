import type {
  KeyPoolInitializer,
  KeyPoolSelector,
  KeyPoolSource,
} from "./types.ts";

export class KeyPool {
  readonly #source: KeyPoolSource;
  readonly #selector: KeyPoolSelector;
  #keys: string[];

  private constructor(
    keys: string[],
    { source, selector }: KeyPoolInitializer,
  ) {
    this.#keys = keys;
    this.#source = source;
    this.#selector = selector;
  }

  static async new(initializer: KeyPoolInitializer): Promise<KeyPool> {
    const keys = await initializer.source();
    return new KeyPool(keys, initializer);
  }

  async refresh(): Promise<void> {
    const keys = await this.#source();
    this.#keys = [...keys];
  }

  setKeys(keys: string[]): void {
    this.#keys = [...keys];
  }

  select(): string | null {
    return this.#selector(this.#keys) ?? null;
  }
}
