import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Ingredient from "../../../models/Ingredient";
import IngredientImage from "../../../models/IngredientImage";

export default async () => {
  try {
    await dbConnect();

    const ingredients = await Ingredient.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .populate([
        {
          path: "photo",
          model: IngredientImage,
        },
      ])
      .exec();

      if (ingredients) {
        return ingredients;
      }
  } catch (e) {
    console.error(e);
  }
}