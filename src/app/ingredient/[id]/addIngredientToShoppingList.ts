"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import ShoppingListItem from "../../../../models/ShoppingListItem";
import { getSession } from "../../../../services/authentication/cookie-session";
import User from "../../../../models/User";

export default async ({
  ingredientId,
  quantity
}: {
  ingredientId: string,
  quantity?: number
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});
    const filter = { _id: ingredientId};
    const [ingredient] = await Ingredient.find(filter);
    const [existingShoppingListItem] = await ShoppingListItem.find({ingredient: new ObjectId(ingredient._id)});

    if (!!!existingShoppingListItem) {
      const shoppingListItem = await ShoppingListItem.create([{user: new ObjectId(user._id), quantity: (quantity || 1) * 10, ingredient: new ObjectId(ingredient._id)}]);
      return JSON.stringify(shoppingListItem);
    } else {
      existingShoppingListItem.quantity = existingShoppingListItem.quantity + (quantity || 1) * 10;
      const updatedShoppingListItem = await ShoppingListItem.findOneAndUpdate({_id: existingShoppingListItem._id}, existingShoppingListItem);
      return JSON.stringify(updatedShoppingListItem);
    }
  } catch (e) {
    console.error(e);
  }
};
