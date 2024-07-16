"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Store from "../../../models/Store";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import { getSession } from "../../../services/authentication/cookie-session";

export default async ({name, id}: {name?: string | null | undefined, id?: string | null | undefined}) => {
  try {
    await dbConnect();

    const session = await getSession();

    const ingredients = await Ingredient.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .populate([
        {
          path: "photo",
          model: IngredientImage,
        },
      ])
      .populate([
        {
          path: "store",
          model: Store,
        },
      ])
      .exec();

    if (ingredients) {
      const ingredientsFiltered = ingredients
        .filter((ingredient) => ingredient.user?.email === session?.login)
        .filter((ingredient) => {
          if (name && name !== '') {
            return ingredient.name.toLowerCase().includes(name.toLowerCase());
          } else {
            return true;
          }
        })
        .filter((ingredient) => {
          if (id) {
            return ingredient.id === id;
          } else {
            return true;
          }
        })
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(ingredientsFiltered);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
