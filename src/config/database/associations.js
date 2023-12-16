import Repair from '../../modules/repairs/repairs.model.js';
import User from '../../modules/users/users.model.js';

export const initialModel = () => {
   User.hasMany(Repair, { foreignKey: 'user_id' });
   Repair.belongsTo(User, { foreignKey: 'user_id' });
};
