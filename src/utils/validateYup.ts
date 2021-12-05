import * as yup from 'yup';

type ReturnTypeYup<T extends yup.BaseSchema> =
  | {
      success: true;
      data: yup.Asserts<T>;
    }
  | {
      success: false;
      error: yup.ValidationError;
    };

export const validateYup = async <T extends yup.BaseSchema>(
  schema: T,
  data: unknown,
): Promise<ReturnTypeYup<T>> => {
  try {
    const validData = await schema.validate(data, { abortEarly: false });

    return {
      success: true,
      data: validData.data,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        error,
      };
    }

    throw error;
  }
};
