"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import IngredientImage from "../../../../models/IngredientImage";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

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

    // const ingredient = Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description}]);

  } catch (e) {
    console.error(e);
  }
};