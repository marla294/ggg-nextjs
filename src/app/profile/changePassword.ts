"use server"
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import bcryptjs from 'bcryptjs';
import { setSession } from "../../../services/authentication/cookie-session";

export default async ({email, password}: {email: string, password: string}) => {
  try {
    await dbConnect();

    const users = await User.find({email}).exec();
    const user = users[0];

    if (user) {
      const encryptedPassword = await bcryptjs.hash(password, 10);
      const isMatch = await bcryptjs.compare(password, encryptedPassword);

      if (isMatch) {
        // set encrypted password
        const filter = { _id: user._id};
        let update = {password: encryptedPassword};
        const updatedUser = await User.findOneAndUpdate(filter, update);
        return JSON.stringify(updatedUser);
        // reset session (maybe?)
      } else {
        // error
      }

      // const authResult = await bcryptjs.compare(password, user.password);
      // if (authResult) {
      //   await setSession({login: email});
      //   return {
      //     success: true
      //   }
      // }
      // else {
      //   return {
      //     success: false,
      //     error: 'Invalid username or password'
      //   }
      // }
    }

    return;

  } catch (e) {
    console.error(e);
  }
}