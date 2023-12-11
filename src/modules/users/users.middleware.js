import { UserService } from './users.service.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';
import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';

export const validateExisteUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const userFind = await UserService.findOne(id);

   if (!userFind) return next(new AppError(`User with ${id} not found`, 404));

   req.user = userFind;

   next();
});

export const protect = catchAsync(async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }

   if (!token) {
      return res.status(401).json({
         status: 'error',
         message: 'You are not logged in!. Please login to get access',
      });
   }

   const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

   const user = await UserService.findOne(decoded.id);

   if (!user) {
      return res.status(401).json({
         status: 'error',
         message: 'The owner of this token is not longer available',
      });
   }

   req.sessionUser = user;
   next();
});

export const restricTo = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.sessionUser.role))
         next(
            new AppError(
               'You do not have permission to perform this action',
               403
            )
         );
      next();
   };
};
