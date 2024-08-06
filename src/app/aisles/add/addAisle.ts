"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Aisle from "../../../../models/Aisle";
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

    const aisle = await Aisle.create([{name, user: new ObjectId(user._id)}]);

    return JSON.stringify(aisle);

  } catch (e) {
    console.error(e);
  }
};
