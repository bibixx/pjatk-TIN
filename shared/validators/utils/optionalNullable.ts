import * as T from 'typed';

export const optionalNullable = <I>(base: T.Typed<I>) => {
  return T.map(
    T.optional(T.nullable(base)),
    v => v === undefined ? T.success(null) : T.success(v)
  )
};
