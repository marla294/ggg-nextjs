"use server";
import ShoppingListItem from "../../../../models/ShoppingListItem";
import dbConnect from "../../../../lib/dbconnect";

export default async ({
  id,
  quantity
}: {
    id: string,
    quantity?: number | null | undefined, 
  }) => {
  try {
    await dbConnect();

    const filter = { shoppingListItemId: id };

    if (quantity) {
      let update = {quantity: quantity * 10};
  
      const ingredient = await ShoppingListItem.findOneAndUpdate(filter, update);

      return JSON.stringify(ingredient);
    } else {
      return;
    }

  } catch (e) {
    console.error(e);
  }
};
