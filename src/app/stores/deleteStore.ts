"use server";
import dbConnect from "../../../lib/dbconnect";
import Store from "../../../models/Store";

export default async ({
  storeId
}: {
  storeId: any,
  }) => {
  try {
    await dbConnect();

    const res = await Store.findByIdAndDelete(storeId);

    return JSON.stringify(res);

  } catch (e) {
    console.error(e);
  }
};