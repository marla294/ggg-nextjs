"use server";
import fs from 'fs';
import { ObjectId } from "mongodb";
import dbConnect from "../../../../lib/dbconnect";
import IngredientImage from "../../../../models/IngredientImage";
import User from "../../../../models/User";
import { getSession } from "../../../../services/authentication/cookie-session";
import cloudinary from 'cloudinary';
import { randomBytes } from 'crypto';

export default async ({
  altText,
  filePath
}: {
  altText?: string | null | undefined, 
  filePath?: any, 
  }) => {
  try {
    await dbConnect();

    const session = await getSession();
    const [user] = await User.find({email: session?.login});

    if (filePath) {
      const stream = fs.createReadStream(filePath);
      const id = randomBytes(20).toString('base64url');
      const _meta = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
          {
            public_id: id,
            folder: process.env.CLOUDINARY_FOLDER,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          },
          (error, result) => {
            if (error || !result) {
              return reject(error)
            }
            resolve(result)
          }
        )

        stream.pipe(cloudinaryStream)
      });

      console.log({_meta});
    }

    // const ingredient = Ingredient.create([{name, user: new ObjectId(user._id), store, units, aisle, homeArea, description}]);

  } catch (e) {
    console.error(e);
  }
};