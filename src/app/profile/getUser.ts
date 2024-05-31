"use server"
import dbConnect from "../../../lib/dbconnect";
import { getSession } from "../../../services/authentication/cookie-session";

export default async () => {
  try {
    await dbConnect();

    const session = await getSession();
    console.log({session});
  } catch (e) {
    console.error(e);
  }
}