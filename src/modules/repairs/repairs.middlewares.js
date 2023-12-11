import { RepairService } from './repairs.service.js';

export const validateRepairExist = async (req, res, next) => {
   try {
      const { id } = req.params;

      const repair = await RepairService.findOne(id);

      if (!repair) {
         return res.status(404).json({
            status: 'error',
            message: 'repair not found',
         });
      }
      req.repair = repair;

      next();
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         status: 'fail',
         message: 'Something went very wrong 🤷‍♂️',
         error,
      });
   }
};
