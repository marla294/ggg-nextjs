"use server";
import Header from "../components/Header";
import signOut from "./signout";

export default async function IngredientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Header signOut={signOut}>{children}</Header>;
}
