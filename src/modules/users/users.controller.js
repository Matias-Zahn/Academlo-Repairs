import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted.password.plugin.js';
import { generateJWT } from '../../config/plugins/genereteJWT.plugin.js';
import {
   validateLoginUser,
   validatePartialUser,
   validateUser,
} from './user.schema.js';
import { UserService } from './users.service.js';

export const findAllUsers = catchAsync(async (req, res, next) => {
   const users = await UserService.findAll();

   return res.status(200).json(users);
});

export const register = catchAsync(async (req, res, next) => {
   const { errorMessages, hasError, userData } = validateUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const emailRepeat = await UserService.findOneByEmail(userData.email);

   if (emailRepeat)
      return next(
         new AppError(
            `The email: ${userData.email} is already registered in the database`,
            409
         )
      );
   const user = await UserService.create(userData);

   const token = await generateJWT(user.id);

   return res.status(201).json({
      token,
      user: {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role,
         status: user.status,
      },
   });
});

export const login = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, userData } = validateLoginUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const user = await UserService.findOneByEmail(userData.email);

   if (!user) return next(new AppError('This account does not exist', 404));

   const isCorrectPassword = await verifyPassword(
      userData.password,
      user.password
   );

   if (!isCorrectPassword)
      return res
         .status(401)
         .json({ status: 'error', message: 'Incorrect email or password' });

   const token = await generateJWT(user.id);

   return res.status(201).json({
      token,
      user,
   });
});

export const findOneUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   return res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
   const { user } = req;
   const { hasError, errorMessages, userData } = validatePartialUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const userUpdated = await UserService.update(user, userData);

   return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   await UserService.delete(user);

   return res.status(204).json(null);
});
