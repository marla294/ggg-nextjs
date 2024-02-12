"use server";
import fs from 'fs';
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import IngredientImage from "../../../../models/IngredientImage";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";
import cloudinary from 'cloudinary';

export default async ({
  altText,
  filePath
}: {
  altText?: string | null | undefined, 
  filePath?: string | null | undefined, 
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    if (filePath) {
      const stream = fs.createReadStream(filePath);
    }

    // const ingredient = Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description}]);

  } catch (e) {
    console.error(e);
  }
};