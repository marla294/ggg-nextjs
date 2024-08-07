"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Aisle from "../../../models/Aisle";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const aisles = await Aisle.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .exec();

    if (aisles) {
      const aislesSorted = aisles
        .filter((aisle) => aisle.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(aislesSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
