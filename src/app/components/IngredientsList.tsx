"use client";
import { useState } from "react";
import IngredientListItem from "./IngredientListItem";
import styled from "styled-components";

const IngredientsBarStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.8rem;

  input,
  select {
    padding: 0.3rem;
    border: 1px solid black;
    font-size: 1.4rem;
    height: 4rem;
    &:focus {
      outline: 0;
    }
  }
`;

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
      <IngredientsBarStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
          // value={inputs.searchTerm}
          // onChange={handleChange}
        />
      </IngredientsBarStyles>
      {displayIngredients?.map((ingredient: any) => (
        <IngredientListItem key={ingredient._id} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default IngredientsList;
