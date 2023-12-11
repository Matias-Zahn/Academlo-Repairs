import bycrypt from 'bcrypt';

export const encyptedPassword = async (password) => {
   const salt = await bycrypt.genSalt(12);

   return await bycrypt.hash(password, salt);
};

export const verifyPassword = async (bodyPassword, userPassword) => {
   return await bycrypt.compare(bodyPassword, userPassword);
};
