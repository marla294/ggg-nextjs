import bcryptjs from 'bcryptjs';
import dbConnect from "../../lib/dbconnect";
import User from "../../models/User";

export default async (req: any, res: any) => {
  try {
    await dbConnect();

    const user = await User.find({});

    res.json({isAuthenticated: true});
  } catch (e) {
    console.error(e);
  }
}