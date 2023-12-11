import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRepair } from './repairs.schema.js';
import { RepairService } from './repairs.service.js';

export const findAllRepairs = async (req, res) => {
   try {
      const repairs = await RepairService.findAll();

      return res.status(200).json(repairs);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const createRepair = catchAsync(async (req, res, next) => {
   console.log(req.body);
   const { hasError, errorMessages, repairData } = validateRepair(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const repair = await RepairService.create(repairData);

   return res.status(201).json(repair);
});

export const findOneRepair = catchAsync(async (req, res) => {
   const { repair } = req;

   return res.status(200).json(repair);
});

export const updateRepair = async (req, res) => {
   try {
      const { repair } = req;

      const repairUpdated = await RepairService.update(repair);

      return res.status(200).json(repairUpdated);
   } catch (error) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
      });
   }
};

export const deleteRepair = async (req, res) => {
   try {
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
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong! 🧨',
         error,
      });
   }
};
