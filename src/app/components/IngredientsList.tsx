"use client";
import { useState } from "react";
import IngredientListItem from "./IngredientListItem";

const IngredientsList = ({
  ingredients,
  getIngredients,
}: {
  ingredients: any;
  getIngredients: any;
}) => {
  const [displayIngredients, setDisplayIngredients] = useState(ingredients);

  return (
    <div>
      <input
        name="searchTerm"
        id="searchTerm"
        placeholder="Search..."
        // value={inputs.searchTerm}
        // onChange={handleChange}
      />
      {displayIngredients?.map((ingredient: any) => (
        <IngredientListItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default IngredientsList;
