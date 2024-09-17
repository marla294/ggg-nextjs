"use server";
import dbConnect from "../../../../lib/dbconnect";
import ShoppingListItem from "../../../../models/ShoppingListItem";

export default async ({
  shoppingListItemId
}: {
  shoppingListItemId: any,
  }) => {
  try {
    await dbConnect();

    
    const res = await ShoppingListItem.findByIdAndDelete(shoppingListItemId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};