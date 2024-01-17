import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

export const repairSchema = z.object({
   date: z.string({
      required_error: 'date is required',
   }),
   motorsNumber: z.string({
      invalid_type_error: 'motorNumber must be a string',
      required_error: 'motorNumber is required',
   }),
   description: z
      .string({
         invalid_type_error: 'motorNumber must be a number',
         required_error: 'motorNumber is required',
      })
      .min(3, { message: 'description is to short' })
      .max(60, { message: 'description is to long' }),
   userId: z.number(),
});

export function validateRepair(data) {
   const result = repairSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: repairData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      repairData,
   };
}
