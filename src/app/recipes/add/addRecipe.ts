"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";
import Recipe from "../../../../models/Recipe";

export default async ({
  name, 
  recipeLink,
  photoId,
  description,
  type,
}: {
    name?: string | null | undefined, 
    recipeLink?: string | null | undefined, 
    photoId?: any,
    description?: string | null | undefined,
    type: string | null | undefined,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const recipe = await Recipe.create([{name, recipeLink, description, type, photo: new ObjectId(photoId), user: new ObjectId(user._id)}])

    return JSON.stringify(recipe);

  } catch (e) {
    console.error(e);
  }
};
