'use server'
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
      const authResult = await bcryptjs.compare(password, user.password);
      if (authResult) {
        await setSession({login: email});
        return {
          success: true
        }
      }
      else {
        return {
          success: false,
          error: 'Invalid username or password'
        }
      }
    }

    return;

  } catch (e) {
    console.error(e);
  }
}