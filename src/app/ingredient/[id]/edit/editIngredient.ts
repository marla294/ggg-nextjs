"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../../lib/dbconnect";
import Ingredient from "../../../../../models/Ingredient";

export default async ({
  id,
  name,
  units,
  aisle,
  homeArea,
  description,
  photoId,
  storeId,
}: {
    id: string,
    name?: string | null | undefined, 
    units?: string | null | undefined,
    aisle?: string | null | undefined,
    homeArea?: string | null | undefined,
    description?: string | null | undefined,
    photoId?: any,
    storeId?: any,
  }) => {
  try {
    await dbConnect();

    const filter = { _id: id};
    let update: any = {name, store: new ObjectId(storeId), units, aisle, homeArea, description};

    if (photoId) {
      update = {...update, photo: new ObjectId(photoId)}
    }

    const ingredient = await Ingredient.findOneAndUpdate(filter, update);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
