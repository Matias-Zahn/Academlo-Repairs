import express from 'express';
import {
   deleteUser,
   findAllUsers,
   findOneUser,
   login,
   register,
   updateUser,
} from './users.controller.js';

export const router = express.Router();

router.route('/').get(findAllUsers).post(register);

router.post('/login', login);

router.route('/:id').get(findOneUser).patch(updateUser).delete(deleteUser);
