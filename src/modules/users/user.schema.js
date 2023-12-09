import z from 'zod';

const registerUserSchema = z.object({
   name: z
      .string({
         invalid_type_error: 'name must be a string',
         required_error: 'name is required',
      })
      .min(3, { message: 'name is too short' })
      .max(50, { message: 'name is too long' }),
   email: z
      .string({
         invalid_type_error: 'Email must be a string',
         required_error: 'Email is required',
      })
      .email({ message: 'Invalid email' }),
   password: z
      .string({
         invalid_type_error: 'Password must be a string',
         required_error: 'Password is required',
      })
      .min(3, { message: 'Password is to short' })
      .max(50, { message: 'Password is to long' }),
});

const loginUserSchema = z.object({
   email: z
      .string({
         invalid_type_error: 'Email must be a string',
         required_error: 'Email is required',
      })
      .email({ message: 'Invalid email' }),
   password: z.string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
   }),
});

export function validateUser(data) {
   const result = registerUserSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}

export const extractValidationData = (resultValidation) => {
   let errorMessages;
   let data; //data limpia
   const hasError = !resultValidation.success;

   if (hasError) errorMessages = JSON.parse(resultValidation.error.message);
   if (!hasError) data = resultValidation.data;

   return {
      hasError,
      errorMessages,
      data,
   };
};

export function validateLoginUser(data) {
   const result = loginUserSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}
