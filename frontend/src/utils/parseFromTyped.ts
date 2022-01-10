import { Typed } from 'typed';

export const parseFromTyped = <OutputData>(
  validator: Typed<OutputData>,
  data: unknown,
) => {
  const result = validator(data);
  return result.success ? result.value : undefined;
};
