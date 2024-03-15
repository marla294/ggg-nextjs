"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import ShoppingListItem from "../../../../models/ShoppingListItem";
import { getSession } from "../../../../services/authentication/cookie-session";
import User from "../../../../models/User";

export default async ({
  id,
}: {
    id: string,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const filter = { _id: id};

    const [ingredient] = await Ingredient.find(filter);

    const shoppingListItem = await ShoppingListItem.create([{user: new ObjectId(user._id), quantity: 1, ingredient: new ObjectId(ingredient._id)}]);

    return JSON.stringify(shoppingListItem);

  } catch (e) {
    console.error(e);
  }
};
