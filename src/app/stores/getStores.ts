"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Store from "../../../models/Store";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const stores = await Store.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .exec();

    if (stores) {
      const storesSorted = stores
        .filter((store) => store.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(storesSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
