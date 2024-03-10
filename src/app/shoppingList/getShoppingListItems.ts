"use server";
import dbConnect from "../../../lib/dbconnect";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import ShoppingListItem from "../../../models/ShoppingListItem";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const shoppingListItems = await ShoppingListItem.find({})
      .populate([
        {
          path: "user",
          model: User,
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

    if (shoppingListItems) {
      const shoppingListItemsFiltered = shoppingListItems
        .filter((shoppingListItem) => shoppingListItem.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(shoppingListItemsFiltered);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};