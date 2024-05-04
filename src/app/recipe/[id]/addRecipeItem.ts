"use server"
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import RecipeItem from "../../../../models/RecipeItem";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({quantity, ingredientId, recipeId}: {quantity: any, ingredientId: any, recipeId: any}) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const recipeItem = await RecipeItem.create([{quantity, user: new ObjectId(user._id), ingredient: new ObjectId(ingredientId), recipe: new ObjectId(recipeId)}]);

    return JSON.stringify(recipeItem);
  } catch (e) {
    console.error(e);
  }
}