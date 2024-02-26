"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../../lib/dbconnect";
import Ingredient from "../../../../../models/Ingredient";
import User from "../../../../../models/User";
import { getSession } from "../../../../../services/authentication/cookie-session";

export default async ({
  id,
  name, 
  store,
  units,
  aisle,
  homeArea,
  description,
  photoId,
}: {
    id: string,
    name?: string | null | undefined, 
    store?: string | null | undefined, 
    units?: string | null | undefined,
    aisle?: string | null | undefined,
    homeArea?: string | null | undefined,
    description?: string | null | undefined,
    photoId?: any,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const filter = { _id: id};
    const update = { name };
    // {name, user: new ObjectId(user._id), store, units, aisle, homeArea, description, photo: new ObjectId(photoId)}

    const ingredient = await Ingredient.findOneAndUpdate(filter, update);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
