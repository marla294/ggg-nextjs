"use server";
import dbConnect from "../../../lib/dbconnect";
import HomeArea from "../../../models/HomeArea";

export default async ({
  homeAreaId
}: {
  homeAreaId: any,
  }) => {
  try {
    await dbConnect();

    const res = await HomeArea.findByIdAndDelete(homeAreaId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};