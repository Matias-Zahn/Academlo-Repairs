import User from '../users/users.model.js';
import Repair from './repairs.model.js';

export class RepairService {
   static async findOne(id, status = ['pending', 'completed']) {
      return await Repair.findOne({
         where: {
            id,
            status: status,
         },
         attributes: {
            exclude: ['createdAt', 'updatedAt'],
         },
         include: [
            {
               model: User,
               attributes: {
                  exclude: [, 'createdAt', 'password', 'updatedAt'],
               },
            },
         ],
      });
   }

   static async findAll() {
      return await Repair.findAll({
         where: {
            status: ['pending', 'completed'],
         },
         attributes: {
            exclude: [, 'createdAt', 'updatedAt', 'status'],
         },
         include: [
            {
               model: User,
               attributes: {
                  exclude: ['createdAt', 'password', 'updatedAt'],
               },
            },
         ],
      });
   }

   static async create(data) {
      return await Repair.create(data);
   }

   static async update(repair) {
      return await repair.update({ status: 'completed' });
   }

   static async delete(repair) {
      return await repair.update({ status: 'cancelled' });
   }
}
