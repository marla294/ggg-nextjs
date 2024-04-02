"use server";
import dbConnect from "../../../lib/dbconnect";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import ShoppingListItem from "../../../models/ShoppingListItem";
import User from "../../../models/User";
import { getSession } from "../../../services/authentication/cookie-session";
import groupArrayBy from "../lib/groupArrayBy";

export default async ({id, sortBy}: {id?: string | null | undefined, sortBy?: string | null | undefined}) => {
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
        .filter((shoppingListItem) => {
          if (id) {
            return shoppingListItem.id === id;
          } else {
            return true;
          }
        });
      
      let shoppingListItemsSorted;

      switch (sortBy) {
        case 'aisle': 
          shoppingListItemsSorted = groupArrayBy(shoppingListItemsFiltered, 'aisle', 'ingredient');
          break;
        default: 
          shoppingListItemsSorted = shoppingListItemsFiltered.sort((a, b) => (a?.ingredient?.name < b?.ingredient?.name ? -1 : 1));
      }

      return JSON.stringify(shoppingListItemsSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};