"use server";
import getIngredients from "./action";
import IngredientsList from "../components/IngredientsList";

export default async function Ingredients() {
  const res = await getIngredients({ name: null });
  const ingredients = JSON.parse(res as string);

  return (
    <>
      <input
        name="searchTerm"
        id="searchTerm"
        placeholder="Search..."
        // value={inputs.searchTerm}
        // onChange={handleChange}
      />
      <IngredientsList ingredients={ingredients} />
    </>
  );
}
