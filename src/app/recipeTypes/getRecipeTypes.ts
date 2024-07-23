"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import RecipeType from "../../../models/RecipeType";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const recipeTypes = await RecipeType.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .exec();

    if (recipeTypes) {
      const recipeTypesSorted = recipeTypes
        .filter((recipeType) => recipeType.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(recipeTypesSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
