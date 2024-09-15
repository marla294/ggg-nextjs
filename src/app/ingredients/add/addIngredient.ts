"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  name,
  units,
  description,
  photoId,
  storeId,
  homeAreaId,
  aisleId,
}: {
    name?: string | null | undefined, 
    units?: string | null | undefined,
    description?: string | null | undefined,
    photoId?: any,
    storeId?: any,
    homeAreaId?: any,
    aisleId?: any,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    let ingredientInput: any = {name, user: new ObjectId(user._id)};

    if (storeId) {
      ingredientInput = {...ingredientInput, store: new ObjectId(storeId)};
    }

    if (units) {
      ingredientInput = {...ingredientInput, units};
    }

    if (aisleId) {
      ingredientInput = {...ingredientInput, aisle: new ObjectId(aisleId)};
    }

    if (homeAreaId) {
      ingredientInput = {...ingredientInput, homeArea: new ObjectId(homeAreaId)};
    }

    if (description) {
      ingredientInput = {...ingredientInput, description};
    }

    if (photoId) {
      ingredientInput = {...ingredientInput, photo: new ObjectId(photoId)};
    }

    const ingredient = await Ingredient.create([ingredientInput]);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
