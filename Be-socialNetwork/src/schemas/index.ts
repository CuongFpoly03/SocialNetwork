import { ConflictError } from "../cores/error.response";

export const validate = (schema: any, objectValidate: any) => {
  const { error } = schema.validate(objectValidate, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item: any) => item.message);
    throw new ConflictError(errors);
  }

  return true;
};
