import { AppError } from './appError.js';

export const handleCastError23503 = () => {
   return new AppError('The id solicited not exist in the data base', 404);
};

export const handleGlobalError = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'fail';

   let error = err;
   if (err.parent?.code === '23503') {
      error = handleCastError23503();

      return res.status(error.statusCode).json({
         status: error.status,
         message: error.message,
      });
   }
   return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
   });
};
