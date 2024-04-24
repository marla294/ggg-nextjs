"use client";

import { useEffect, useState } from "react";
import getRecipes from "./getRecipes";
import { BarContainer, ListContainer } from "../ingredients/page";
import RecipeListItem from "../components/RecipeListItem";
import { ListBarStyles } from "../shoppingList/page";
import styled from "styled-components";

const AddButtonStyles = styled.button`
  width: 8rem;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
  &:hover {
    background: var(--darkGreen);
    color: white;
  }
`;

export default function Recipes() {
  const [displayRecipes, setDisplayRecipes] = useState<any>(null);

  const fetchRecipes = async () => {
    const res = await getRecipes({});
    const tempRecipes = JSON.parse(res as string);
    setDisplayRecipes(tempRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <BarContainer>
        <h3>Recipes</h3>
        <ListBarStyles>
          <AddButtonStyles type="button">Add</AddButtonStyles>
          {/* <SortByStyles>
            <label htmlFor="sortBy">Sort:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={handleChange}>
              {sortOptions.map((option) => (
                <option
                  value={option.value}
                  id={option.value}
                  key={Math.random()}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles> */}
        </ListBarStyles>
      </BarContainer>
      <ListContainer>
        {displayRecipes?.map((recipe: any) => (
          <RecipeListItem key={recipe._id} recipe={recipe} />
        ))}
      </ListContainer>
    </>
  );
}
