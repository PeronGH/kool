import { MaybePromise } from "./utils.ts";

export type KeyPoolInitializer = {
  /** will be called on creation or refreshing */
  source: KeyPoolSource;
  /** will be called when selecting keys */
  selector: KeyPoolSelector;
};

export type KeyPoolSource = () => MaybePromise<string[]>;

export type KeyPoolSelector = (keys: string[]) => string | null | undefined;
