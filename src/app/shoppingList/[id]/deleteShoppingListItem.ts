"use server";
import dbConnect from "../../../../lib/dbconnect";
import ShoppingListItem from "../../../../models/ShoppingListItem";

export default async ({
  shoppingListItemId,
  ingredientId,
}: {
  shoppingListItemId?: any,
  ingredientId?: any
  }) => {
  try {
    await dbConnect();

    let res: any;

    if (shoppingListItemId) {
      res = await ShoppingListItem.findByIdAndDelete(shoppingListItemId);
    } else if (ingredientId) {
      // delete all shopping list items associated with the same ingredient id here
      res = await ShoppingListItem.deleteMany({ingredient: new Object(ingredientId)});
    }

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};