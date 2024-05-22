"use server"
import dbConnect from "../../../../lib/dbconnect"
import RecipeImage from "../../../../models/RecipeImage";

export default async ({recipeImageId}: {recipeImageId: any}) => {
  try {
    await dbConnect();

    const res = await RecipeImage.findByIdAndDelete(recipeImageId);

    return JSON.stringify(res);
  } catch(e) {
    console.error(e);
  }
}