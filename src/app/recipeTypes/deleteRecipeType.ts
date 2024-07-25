"use server";
import dbConnect from "../../../lib/dbconnect";
import RecipeType from "../../../models/RecipeType";

export default async ({
  recipeTypeId
}: {
  recipeTypeId: any,
  }) => {
  try {
    await dbConnect();

    const res = await RecipeType.findByIdAndDelete(recipeTypeId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};