import express from 'express';
import {
   createRepair,
   deleteRepair,
   findAllRepairs,
   findOneRepair,
   updateRepair,
} from './repairs.controller.js';
import { protect, restricTo } from '../users/users.middleware.js';
import { validateRepairExist } from './repairs.middlewares.js';

export const router = express.Router();

router.post('/', createRepair);

router.use(protect);

router.get('/', findAllRepairs);

router
   .route('/:id')
   .get(validateRepairExist, findOneRepair)
   .patch(validateRepairExist, updateRepair)
   .delete(validateRepairExist, deleteRepair);
