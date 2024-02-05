"use server";
import getIngredients from "./action";
import IngredientsList from "../components/IngredientsList";

export default async function Ingredients() {
  const res = await getIngredients({ name: null });
  const initialIngredients = JSON.parse(res as string);

  return (
    <>
      <IngredientsList
        ingredients={initialIngredients}
        getIngredients={getIngredients}
      />
    </>
  );
}
