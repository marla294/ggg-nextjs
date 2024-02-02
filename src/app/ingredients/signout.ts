'use server'
import { deleteSession } from "../../../services/authentication/cookie-session";

export default async function signOut() {
  "use server";
  await deleteSession();
}