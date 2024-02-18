"use server";
import fs from 'fs';
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import IngredientImage from "../../../../models/IngredientImage";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";
import cloudinary from 'cloudinary';
import { randomBytes } from 'crypto';
import path from 'path';

export default async ({
  altText,
  url
}: {
  altText?: string | null | undefined, 
  url?: string | null | undefined, 
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    const ingredient = IngredientImage.create([{}]);

  } catch (e) {
    console.error(e);
  }
};