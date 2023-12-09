import { generateJWT } from '../../config/plugins/genereteJWT.plugin.js';
import { validateLoginUser, validateUser } from './user.schema.js';
import { UserService } from './users.service.js';

export const findAllUsers = async (req, res) => {
   try {
      const users = await UserService.findAll();

      return res.status(200).json(users);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const register = async (req, res) => {
   try {
      const { errorMessages, hasError, userData } = validateUser(req.body);

      if (hasError)
         return res
            .status(422)
            .json({ status: 'error', message: errorMessages });

      const user = await UserService.create(userData);

      const token = await generateJWT(user.id);

      return res.status(201).json({
         token,
         user,
      });
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const login = async (req, res) => {
   try {
      // Validar que los datos sean correctos, enviados por el body

      const { hasError, errorMessages, userData } = validateLoginUser(req.body);

      if (hasError)
         return res
            .status(422)
            .json({ status: 'error', message: errorMessages });

      // Verificar que dichos datos coincidan con el de alguna cuenta
      const user = await UserService.findOneByEmail(userData.email);

      if (!user)
         return res
            .status(404)
            .json({ status: 'error', message: 'User not found' });

      // Antes de continuar, deberia hacer la encriptacion de la password
      // Ya que para seguir necesitamos comparar la contraseña mandada por el body y la contraseña que esta en la base de datos

      //! TERMINAR DE CREAR CON BY LA VARIABLE ISPASSWORDCORRECT
      let isPasswordCorrect;

      if (!isPasswordCorrect)
         return res
            .status(401)
            .json({ status: 'error', message: 'Incorrect email or password' });

      const token = await generateJWT(user.id);

      return res.status(201).json({
         token,
         user,
      });
   } catch (error) {
      console.error(error);
   }
};

export const findOneUser = async (req, res) => {
   try {
      const { id } = req.params;

      const user = await UserService.findOne(id);

      if (!user) {
         return res.status(404).json({
            status: 'error',
            message: 'user not found',
         });
      }

      return res.status(200).json(user);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const updateUser = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await UserService.findOne(id);

      if (!user) {
         return res.status(404).json({
            status: 'error',
            message: 'user not found',
         });
      }

      const userUpdated = await UserService.update(user, { name, email });

      return res.status(200).json(userUpdated);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const deleteUser = async (req, res) => {
   try {
      const { id } = req.params;

      const user = await UserService.findOne(id);

      if (!user) {
         return res.status(404).json({
            status: 'error',
            message: 'user not found',
         });
      }

      await UserService.delete(user);

      return res.status(204).json(null);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};
