"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  ingredientId
}: {
  ingredientId: any,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    // const ingredient = await Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description, photo: new ObjectId(photoId)}]);

    const res = await Ingredient.deleteOne({filter: {id: ingredientId}})

    // return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
