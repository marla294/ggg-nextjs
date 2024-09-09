"use server"
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import bcryptjs from 'bcryptjs';

export default async ({email, password, name, token}: {email: string, password: string, name: string, token: any}) => {
  console.log({token});
  try {
    await dbConnect();

    const users = await User.find({email}).exec();
    const user = users[0];

    if (!user) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/;
      const passesPasswordRules = pattern.test(password);

      if (password.length < 8) {
        return {success: false, error: 'Password must be at least 8 characters'};
      }

      if (!passesPasswordRules) {
        return {success: false, error: 'Password must have at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter'};
      }

      const encryptedPassword = await bcryptjs.hash(password, 10);
      const isMatch = await bcryptjs.compare(password, encryptedPassword);

      if (isMatch) {
        try {
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = String(today.getMonth() + 1).padStart(2, '0');
          let dd = String(today.getDate()).padStart(2, '0');
          const joinDate = `${mm}/${dd}/${yyyy}`;

          await User.create([{name, email, joinDate, password: encryptedPassword}]);
          return {success: true};
        } catch (e) {
          console.error(e);
          return {success: false, error: 'Unexpected error while creating user'};
        }
      } else {
        return {success: false, error: 'Unexpected error while creating user'};
      }
    } else {
      return {success: false, error: 'Unexpected error while creating user'};
    }

    return;

  } catch (e) {
    console.error(e);
  }
}