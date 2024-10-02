"use server";
import dbConnect from "../../../lib/dbconnect";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";
import Store from "../../../models/Store";
import HomeArea from "../../../models/HomeArea";
import Aisle from "../../../models/Aisle";
import ShoppingListItem from "../../../models/ShoppingListItem";
import User from "../../../models/User";
import Recipe from "../../../models/Recipe";
import { getSession } from "../../../services/authentication/cookie-session";
import groupArrayBy from "../lib/groupArrayBy";

export default async ({id, sortBy, ingredientId}: {id?: string | null | undefined, sortBy?: string | null | undefined, ingredientId?: string | null | undefined}) => {
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
          populate: [{
            path: "photo",
            model: IngredientImage,
          }, {
            path: "store",
            model: Store,
          }, {
            path: "homeArea",
            model: HomeArea,
          }, {
            path: "aisle",
            model: Aisle,
          }]
        },
      ])
      .populate([{
        path: 'recipe',
        model: Recipe
      }])
      .exec();

    if (shoppingListItems) {
      const shoppingListItemsFiltered = shoppingListItems
        .filter((shoppingListItem) => shoppingListItem.user?.email === session?.login)
        .filter((shoppingListItem) => id ? shoppingListItem.id === id : true)
        .filter((shoppingListItem) => ingredientId ? shoppingListItem.ingredient?._id === ingredientId : true);

      if (id || ingredientId) {
        return JSON.stringify(shoppingListItemsFiltered);
      }

      if (sortBy === 'recipe') {
        const shoppingListItemsSorted = groupArrayBy(shoppingListItemsFiltered as any, sortBy);
        return JSON.stringify(shoppingListItemsSorted);
      }

      // Taking recipe out of shoppingListItems
      const shoppingListItemsRecipeGrouping = shoppingListItemsFiltered.reduce((grouping: any, currentVal: any) => {
        let findMember = grouping?.find((val: any) => {
          if (val?.ingredient && currentVal?.ingredient) {
            return val?.ingredient._id === currentVal?.ingredient._id
          } else {
            return false;
          }
        });

        let groupingArray: any[] = [];

        if (findMember) {
          groupingArray = grouping.map((val: any) => {
            if (val?.ingredient._id === currentVal?.ingredient._id) {
              val.quantity = val?.quantity + currentVal?.quantity;
            }
            return val;
          });
        } else {
          groupingArray = [...grouping, currentVal];
        }
        
        return groupingArray;
      }, []);

      const shoppingListItemsSorted = sortBy === 'alphabetical' 
        ? [['Alphabetical', shoppingListItemsRecipeGrouping.sort((a: any, b: any) => (a?.ingredient?.name < b?.ingredient?.name ? -1 : 1))]] 
        : groupArrayBy(shoppingListItemsRecipeGrouping as any, sortBy, 'ingredient');

      return JSON.stringify(shoppingListItemsSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};