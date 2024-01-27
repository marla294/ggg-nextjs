import dbConnect from "../../lib/dbconnect";
import User from "../../models/User";
import bcryptjs from 'bcryptjs';

export default async (req: any, res: any) => {
  try {
    await dbConnect();
    const {email, password} = req.body;
    const users = await User.find({email})
    .exec();
    const user = users[0];

    if (user) {
      const authResult = await bcryptjs.compare(password, user.password);
      console.log({authResult, user});
    }

    res.json(user);
  } catch (e) {
    console.error(e);
  }
}