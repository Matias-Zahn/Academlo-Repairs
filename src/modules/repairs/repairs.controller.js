import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRepair } from './repairs.schema.js';
import { RepairService } from './repairs.service.js';

export const findAllRepairs = catchAsync(async (req, res, next) => {
   const repairs = await RepairService.findAll();

   return res.status(200).json(repairs);
});

export const createRepair = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, repairData } = validateRepair(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const repair = await RepairService.create(repairData);

   return res.status(201).json(repair);
});

export const findOneRepair = catchAsync(async (req, res, next) => {
   const { repair } = req;

   return res.status(200).json(repair);
});

export const updateRepair = catchAsync(async (req, res, next) => {
   const { repair } = req;

   const repairUpdated = await RepairService.update(repair);

   return res.status(200).json(repairUpdated);
});

export const deleteRepair = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const repair = await RepairService.findOne(id, ['pending', 'completed']);

   if (repair?.status === 'completed') {
      return res.status(400).json({
         status: 'error',
         message: 'the repair has been already completed',
      });
   }

   if (!repair) {
      return res.status(404).json({
         status: 'error',
         message: 'repair not found',
      });
   }

   await RepairService.delete(repair);

   return res.status(204).json(null);
});
