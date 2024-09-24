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
        .filter((shoppingListItem) => id ? shoppingListItem.id === id : true);

      if (id) {
        return JSON.stringify(shoppingListItemsFiltered);
      }

      // const shoppingListItemsRecipeGrouping = shoppingListItemsFiltered.reduce((grouping: any, currentVal: any) => {
      //   let findMember = grouping?.find((val: any) => {
      //     return val?.ingredient?._id === currentVal?.ingredient?._id
      //   });

      //   let groupingArray: any[] = [];

      //   if (findMember) {
      //     groupingArray = grouping.map((val: any) => {
      //       if (val?.ingredient?._id === currentVal?.ingredient?._id) {
      //         return {...val, quantity: val?.quantity + currentVal?.quantity};
      //       } else {
      //         return val;
      //       }
      //     });
      //   } else {
      //     groupingArray = [...grouping, currentVal];
      //   }
        
      //   return groupingArray;
      // }, []);

      const shoppingListItemsSorted = sortBy === 'alphabetical' 
        ? [['Alphabetical', shoppingListItemsFiltered.sort((a, b) => (a?.ingredient?.name < b?.ingredient?.name ? -1 : 1))]] 
        : groupArrayBy(shoppingListItemsFiltered, sortBy, 'ingredient');

      return JSON.stringify(shoppingListItemsSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};