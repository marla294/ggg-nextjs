"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";
import RecipeImage from "../../../../models/RecipeImage";

export default async ({
  altText,
  url
}: {
  altText?: string | null | undefined, 
  url?: string | null | undefined, 
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const recipeImage = await RecipeImage.create([{altText, user: new ObjectId(user._id), imageUrl: url}]);

    return JSON.stringify(recipeImage);

  } catch (e) {
    console.error(e);
  }
};