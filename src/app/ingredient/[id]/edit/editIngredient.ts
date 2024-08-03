"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../../lib/dbconnect";
import Ingredient from "../../../../../models/Ingredient";

export default async ({
  id,
  name,
  units,
  aisle,
  description,
  photoId,
  storeId,
  homeAreaId,
}: {
    id: string,
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

    const filter = { _id: id};
    let update: any = {name, store: new ObjectId(storeId), units, aisle, homeArea: new ObjectId(homeAreaId), description};

    if (photoId) {
      update = {...update, photo: new ObjectId(photoId)}
    }

    const ingredient = await Ingredient.findOneAndUpdate(filter, update);

    return JSON.stringify(ingredient);

  } catch (e) {
    console.error(e);
  }
};
