"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Unit from "../../../../models/Unit";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  name
}: {
    name: string, 
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const unit = await Unit.create([{name, user: new ObjectId(user._id)}]);

    return JSON.stringify(unit);

  } catch (e) {
    console.error(e);
  }
};