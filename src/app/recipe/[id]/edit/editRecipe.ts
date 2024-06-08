"use server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../../lib/dbconnect";
import Recipe from "../../../../../models/Recipe";

export default async ({
  id,
  name,
  type,
  recipeLink,
  description,
  photoId,
}: {
    id: string,
    name?: string | null | undefined,
    type?: string | null | undefined,
    recipeLink?: string | null | undefined,
    description?: string | null | undefined,
    photoId?: any,
  }) => {
  try {
    await dbConnect();

    const filter = { _id: id};
    let update: any = {name, type, recipeLink, description};

    if (photoId) {
      update = {...update, photo: new ObjectId(photoId)}
    }

    const recipe = await Recipe.findOneAndUpdate(filter, update);

    return JSON.stringify(recipe);

  } catch (e) {
    console.error(e);
  }
};
