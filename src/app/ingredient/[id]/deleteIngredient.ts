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

    
    const res = await Ingredient.deleteOne({filter: {_id: ingredientId}})
    
    console.log({ingredientId, res});

    // return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
