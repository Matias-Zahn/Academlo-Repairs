import express from 'express';
import { router as usersRoute } from '../modules/users/users.route.js';
import { router as repairsRoute } from '../modules/repairs/repairs.route.js';

export const router = express.Router();

router.use('/repairs', repairsRoute);
router.use('/users', usersRoute);
