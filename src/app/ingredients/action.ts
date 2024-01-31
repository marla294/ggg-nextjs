'use server'
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();
    console.log({session});

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
      .exec();

      if (ingredients) {
        const ingredientsFiltered = ingredients.filter(ingredient => ingredient.user?.email === session?.login);
        return JSON.stringify(ingredientsFiltered);
      } else {
        return null;
      }
  } catch (e) {
    console.error(e);
  }
}