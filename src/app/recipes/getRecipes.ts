"use server"
import dbConnect from "../../../lib/dbconnect";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    // const ingredients = await Ingredient.find({})
    //   .populate([
    //     {
    //       path: "user",
    //       model: User,
    //     },
    //   ])
    //   .populate([
    //     {
    //       path: "photo",
    //       model: IngredientImage,
    //     },
    //   ])
    //   .exec();

    // if (ingredients) {
    //   return JSON.stringify(ingredients);
    // } else {
    //   return null;
    // }
  } catch (e) {
    console.error(e);
  }
}