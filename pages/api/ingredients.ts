import dbConnect from "../../lib/dbconnect";
import Ingredient from "../../models/Ingredient";
import User from "../../models/User";

export default async (_req: any, res: any) => {
  try {
    await dbConnect();

    const ingredients = await Ingredient.find({})
    .populate("user", "user", User)
    .exec();

    res.json(ingredients);
  } catch (e) {
    console.error(e);
  }
}