import express from 'express';
import {
   deleteUser,
   findAllUsers,
   findOneUser,
   login,
   register,
   updateUser,
} from './users.controller.js';
import {
   protect,
   protectAccountOwner,
   validateExisteUser,
} from './users.middleware.js';

export const router = express.Router();

router.post('/', register);
router.post('/login', login);

router.use(protect);

router.get('/', findAllUsers);

router
   .route('/:id')
   .get(validateExisteUser, findOneUser)
   .patch(validateExisteUser, protectAccountOwner, updateUser)
   .delete(validateExisteUser, protectAccountOwner, deleteUser);
