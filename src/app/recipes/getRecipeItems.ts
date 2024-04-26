"use server"
import dbConnect from "../../../lib/dbconnect";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import Recipe from "../../../models/Recipe";
import RecipeItem from "../../../models/RecipeItem";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";

export default async ({recipeId}: {recipeId: string}) => {
  try {
    await dbConnect();

    const session = await getSession();

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
      .populate([
        {
          path: "ingredient",
          model: Ingredient,
          populate: {
            path: "photo",
            model: IngredientImage,
          }
        },
      ])
      .exec();

    if (recipeItems) {
      const recipeItemsFiltered = recipeItems
      .filter(recipeItem => recipeItem.user?.email === session?.login)
      .filter(recipeItem => recipeItem.recipe?.id === recipeId)
      .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(recipeItemsFiltered);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}
