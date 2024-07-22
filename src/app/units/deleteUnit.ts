"use server";
import dbConnect from "../../../lib/dbconnect";
import Unit from "../../../models/Unit";

export default async ({
  unitId
}: {
  unitId: any,
  }) => {
  try {
    await dbConnect();

    const res = await Unit.findByIdAndDelete(unitId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};