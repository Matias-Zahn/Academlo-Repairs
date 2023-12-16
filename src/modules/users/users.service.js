import Repair from '../repairs/repairs.model.js';
import User from './users.model.js';

export class UserService {
   static async findOne(id) {
      return await User.findOne({
         where: {
            id: id,
            status: 'available',
         },
         attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'status'],
         },
      });
   }

   static async findAll() {
      return await User.findAll({
         where: {
            status: 'available',
         },
         attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'status'],
         },
      });
   }

   static async create(data) {
      return await User.create(data);
   }

   static async update(user, data) {
      return await user.update(data);
   }

   static async delete(user) {
      return await user.update({ status: 'disabled' });
   }

   static async findOneByEmail(email) {
      return await User.findOne({
         where: {
            status: 'available',
            email: email,
         },
      });
   }
}
