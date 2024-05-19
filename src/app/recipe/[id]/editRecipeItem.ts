"use server";
import dbConnect from "../../../../lib/dbconnect";
import RecipeItem from "../../../../models/RecipeItem";

export default async ({
  id,
  quantity
}: {
    id: string,
    quantity?: number | null | undefined, 
  }) => {
  try {
    await dbConnect();

    const filter = { _id: id}

    if (quantity) {
      let update = {quantity: quantity * 10};
  
      const recipeItem = await RecipeItem.findOneAndUpdate(filter, update);

      return JSON.stringify(recipeItem);
    } else {
      return;
    }

  } catch (e) {
    console.error(e);
  }
};