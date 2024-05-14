"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
// import Ingredient from "../../../../models/Ingredient";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  name, 
  recipeLink,
  photoId,
  description,
  type,
  userId,
}: {
    name?: string | null | undefined, 
    recipeLink?: string | null | undefined, 
    photoId?: any,
    description?: string | null | undefined,
    type: string | null | undefined,
    userId?: any
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    // const ingredient = await Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description, photo: new ObjectId(photoId)}]);

    // return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
