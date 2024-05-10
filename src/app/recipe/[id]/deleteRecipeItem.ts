"use server"
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect"
import RecipeItem from "../../../../models/RecipeItem";

export default async ({recipeItemId}: {recipeItemId: any}) => {
  try {
    await dbConnect();

    console.log({recipeItemId})

    // const res = RecipeItem.findByIdAndDelete(recipeItemId);

    // const res = RecipeItem.findOneAndDelete({_id: new ObjectId(recipeItemId)}, {strict: 'throw'});

    const res = RecipeItem.findById(recipeItemId);

    console.log({res});

    // return JSON.stringify(res);
    return;
  } catch(e) {
    console.log({e})
    console.error(e);
  }
}