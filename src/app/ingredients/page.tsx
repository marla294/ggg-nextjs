"use server";
import getIngredients from "./action";
import IngredientsList from "../components/IngredientsList";

export default async function Ingredients() {
  return (
    <>
      <IngredientsList getIngredients={getIngredients} />
    </>
  );
}
