"use server";
import Header from "../components/Header";

export default async function IngredientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Header>{children}</Header>;
}
