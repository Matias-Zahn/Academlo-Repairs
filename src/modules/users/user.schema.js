import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

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
   role: z.string(),
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

export function validatePartialUser(data) {
   const result = registerUserSchema.partial().safeParse(data);

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
