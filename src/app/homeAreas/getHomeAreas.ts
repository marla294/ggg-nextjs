"use server";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";
import HomeArea from "../../../models/HomeArea";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();

    const homeAreas = await HomeArea.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .exec();

    if (homeAreas) {
      const homeAreasSorted = homeAreas
        .filter((homeArea) => homeArea.user?.email === session?.login)
        .sort((a, b) => (a.name < b.name ? -1 : 1));
      return JSON.stringify(homeAreasSorted);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
