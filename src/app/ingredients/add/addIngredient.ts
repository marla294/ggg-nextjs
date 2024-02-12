"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import Ingredient from "../../../../models/Ingredient";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";

export default async ({
  name, 
  id, 
  store,
  units,
  aisle,
  homeArea,
  description,
}: {
    name?: string | null | undefined, 
    id?: string | null | undefined, 
    store?: string | null | undefined, 
    units?: string | null | undefined,
    aisle?: string | null | undefined,
    homeArea?: string | null | undefined,
    description?: string | null | undefined,
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const ingredient = Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description}]);

  } catch (e) {
    console.error(e);
  }
};
