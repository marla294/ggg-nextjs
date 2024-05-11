"use server"
import dbConnect from "../../../../lib/dbconnect"
import RecipeItem from "../../../../models/RecipeItem";

export default async ({recipeItemId}: {recipeItemId: any}) => {
  try {
    await dbConnect();

    const res = await RecipeItem.findByIdAndDelete(recipeItemId);

    return JSON.stringify(res);
  } catch(e) {
    console.error(e);
  }
}