export type KeyPoolInitializer = {
  /** will be called when selecting keys */
  selector: KeyPoolSelector;
};

export type KeyPoolSelector = (keys: string[]) => string | null | undefined;
