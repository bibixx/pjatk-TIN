export type ReplaceDateWithNumber<T> = {
  [Key in keyof T]: T[Key] extends Date
    ? number
    : T[Key] extends Date | null
      ? number | null
      : T[Key];
};
