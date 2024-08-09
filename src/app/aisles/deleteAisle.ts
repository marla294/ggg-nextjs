"use server";
import dbConnect from "../../../lib/dbconnect";
import Aisle from "../../../models/Aisle";

export default async ({
  aisleId
}: {
  aisleId: any,
  }) => {
  try {
    await dbConnect();

    const res = await Aisle.findByIdAndDelete(aisleId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};