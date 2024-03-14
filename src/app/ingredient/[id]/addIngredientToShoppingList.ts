"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";

export default async ({
  id,
}: {
    id: string,
  }) => {
  try {
    await dbConnect();

    const filter = { _id: id};

    const ingredient = await Ingredient.find(filter);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
