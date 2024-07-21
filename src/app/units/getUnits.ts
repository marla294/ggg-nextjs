"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import Unit from "../../../models/Unit";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const units = await Unit.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .exec();

    if (units) {
      const unitsSorted = units
        .filter((unit) => unit.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(unitsSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};