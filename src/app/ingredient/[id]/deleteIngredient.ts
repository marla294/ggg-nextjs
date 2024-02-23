"use server";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";

export default async ({
  ingredientId
}: {
  ingredientId: any,
  }) => {
  try {
    await dbConnect();

    const res = await Ingredient.findByIdAndDelete(ingredientId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};
