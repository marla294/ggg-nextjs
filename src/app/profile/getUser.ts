"use server"
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const users = await User.find({}).exec();

    if (users) {
      const theUser = users
      .filter(user => user.email === session?.login)[0];

      return JSON.stringify(theUser);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}