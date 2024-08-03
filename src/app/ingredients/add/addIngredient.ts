"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  name,
  units,
  aisle,
  description,
  photoId,
  storeId,
  homeAreaId,
}: {
    name?: string | null | undefined, 
    units?: string | null | undefined,
    aisle?: string | null | undefined,
    description?: string | null | undefined,
    photoId?: any,
    storeId?: any,
    homeAreaId?: any,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const ingredient = await Ingredient.create([{name, user: new ObjectId(user._id), store: new ObjectId(storeId), units, aisle, homeArea: new ObjectId(homeAreaId), description, photo: new ObjectId(photoId)}]);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
