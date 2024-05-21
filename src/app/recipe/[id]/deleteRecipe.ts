"use server"
import dbConnect from "../../../../lib/dbconnect"
import Recipe from "../../../../models/Recipe";
import RecipeItem from "../../../../models/RecipeItem";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({recipeId}: {recipeId: any}) => {
  try {
    await dbConnect();
    const session = await getSession();

    // Delete associated recipe items
    const recipeItems = await RecipeItem.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .populate([
        {
          path: "recipe",
          model: Recipe,
        },
      ])
      .exec();

    if (recipeItems) {
      const recipeItemsToDelete = recipeItems
        .filter(recipeItem => recipeItem.user?.email === session?.login)
        .filter(recipeItem => recipeItem.recipe?.id === recipeId);

      const deletePromises = recipeItemsToDelete?.map(recipeItem => RecipeItem.findByIdAndDelete(recipeItem?._id));
      await Promise.all(deletePromises);
    }

    // Delete recipe image

    // Delete recipe
    const res = await Recipe.findByIdAndDelete(recipeId);

    return JSON.stringify(res);
  } catch(e) {
    console.error(e);
  }
}