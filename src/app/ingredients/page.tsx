"use server";
import getIngredients from "./action";
import IngredientsList from "../components/IngredientsList";

export default async function Ingredients() {
  const res = await getIngredients({ name: null });
  const ingredients = JSON.parse(res as string);

  return (
    <>
      <IngredientsList
        ingredients={ingredients}
        getIngredients={getIngredients}
      />
    </>
  );
}
