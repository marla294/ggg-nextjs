"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import ShoppingListItem from "../../../../models/ShoppingListItem";
import { getSession } from "../../../../services/authentication/cookie-session";
import User from "../../../../models/User";

export default async ({
  ingredientId,
}: {
  ingredientId: string,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const filter = { _id: ingredientId};

    const [ingredient] = await Ingredient.find(filter);

    // TODO: Search shopping list and if the ingredient already exists, add it to the existing shopping list item
    const [existingShoppingListItem] = await ShoppingListItem.find({ingredient: new ObjectId(ingredient._id)});

    console.log({existingShoppingListItem});

    if (!!!existingShoppingListItem) {
      const shoppingListItem = await ShoppingListItem.create([{user: new ObjectId(user._id), quantity: 10, ingredient: new ObjectId(ingredient._id)}]);

      return JSON.stringify(shoppingListItem);
    } else {
      existingShoppingListItem.quantity = existingShoppingListItem.quantity + 10;
      
    }

    

  } catch (e) {
    console.error(e);
  }
};
