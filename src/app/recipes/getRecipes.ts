"use server"
import dbConnect from "../../../lib/dbconnect";
import Recipe from "../../../models/Recipe";
import RecipeImage from "../../../models/RecipeImage";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";
import groupArrayBy from "../lib/groupArrayBy";

export default async ({id, sortBy}: {id?: string | null | undefined, sortBy?: string | null | undefined}) => {
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
          return recipe?.id === id;
        } else {
          return true;
        }
      }).sort((a, b) => (a.name < b.name ? -1 : 1));

      let recipeItemsSorted: Array<any> | null = null;

      if (sortBy) {
        recipeItemsSorted = sortBy === 'alphabetical' 
        ? [['Alphabetical', recipesFiltered.sort((a, b) => (a?.name < b?.name ? -1 : 1))]] 
        : groupArrayBy(recipesFiltered, sortBy);
      }

      return JSON.stringify(recipeItemsSorted || recipesFiltered);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}