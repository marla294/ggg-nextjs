'use server'
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import bcryptjs from 'bcryptjs';
import { setSession } from "../../../services/authentication/cookie-session";

export default async (req: any, res: any) => {
  try {
    await dbConnect();

    const {email, password} = req.body;

    const users = await User.find({email}).exec();
    const user = users[0];
    console.log({user});

    if (user) {
      const authResult = await bcryptjs.compare(password, user.password);
      console.log({authResult});
      await setSession({login: email});
    }

    return;

  } catch (e) {
    console.error(e);
  }
}