"use server"
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import bcryptjs from 'bcryptjs';

export default async ({email, password}: {email: string, password: string}) => {
  try {
    await dbConnect();

    const users = await User.find({email}).exec();
    const user = users[0];

    if (user) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/;
      const passesPasswordRules = pattern.test(password);

      console.log({passesPasswordRules});

      if (password.length < 8) {
        return {success: false, error: 'Password must be at least 8 characters'};
      }

      if (!passesPasswordRules) {
        return {success: false, error: 'Password must have at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter'};
      }

      const encryptedPassword = await bcryptjs.hash(password, 10);
      const isMatch = await bcryptjs.compare(password, encryptedPassword);

      if (isMatch) {
        const filter = { _id: user._id};
        let update = {password: encryptedPassword};
        await User.findOneAndUpdate(filter, update);
        return {
          success: true
        };
      } else {
        return {success: false, error: 'Unexpected error while resetting password'}
      }
    }

    return;

  } catch (e) {
    console.error(e);
  }
}