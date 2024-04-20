"use server"
import dbConnect from "../../../lib/dbconnect";
import Recipe from "../../../models/Recipe";
import RecipeImage from "../../../models/RecipeImage";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";

export default async ({id}: {id?: string | null | undefined}) => {
  try {
    await dbConnect();

    const session = await getSession();

    const recipes = await Recipe.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .populate([
        {
          path: "photo",
          model: RecipeImage,
        },
      ])
      .exec();

    if (recipes) {
      const recipesFiltered = recipes
      .filter(recipe => recipe.user?.email === session?.login)
      .filter((recipe) => {
        if (id) {
          return recipe.id === id;
        } else {
          return true;
        }
      }).sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(recipesFiltered);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}