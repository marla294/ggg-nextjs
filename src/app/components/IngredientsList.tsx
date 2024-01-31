"use client";
import IngredientListItem from "./IngredientListItem";

const IngredientsList = ({ ingredients }: { ingredients: any }) => {
  return (
    <div>
      {ingredients?.map((ingredient: any) => (
        <IngredientListItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default IngredientsList;
