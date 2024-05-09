"use server"
import dbConnect from "../../../../lib/dbconnect"
import RecipeItem from "../../../../models/RecipeItem";

export default async ({recipeItemId}: {recipeItemId: any}) => {
  try {
    await dbConnect();

    console.log({recipeItemId})

    const res = RecipeItem.findByIdAndDelete(recipeItemId);

    console.log({res});

    // return JSON.stringify(res);
    return;
  } catch(e) {
    console.error(e);
  }
}