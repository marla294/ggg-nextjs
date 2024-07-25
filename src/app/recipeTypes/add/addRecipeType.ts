"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import RecipeType from "../../../../models/RecipeType";
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

    const recipeType = await RecipeType.create([{name, user: new ObjectId(user._id)}]);

    return JSON.stringify(recipeType);

  } catch (e) {
    console.error(e);
  }
};
