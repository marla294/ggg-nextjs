"use client";
import { useEffect, useState } from "react";
import IngredientListItem from "./IngredientListItem";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";

const IngredientsBarStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.8rem;

  input,
  select {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1.4rem;
    height: 4rem;
  }
`;

const IngredientsListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 1rem;
`;

const IngredientsList = ({ getIngredients }: { getIngredients: any }) => {
  const [displayIngredients, setDisplayIngredients] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const fetchIngredients = async () => {
    const res = await getIngredients({ name: searchTerm });
    const tempIngredients = JSON.parse(res as string);
    setDisplayIngredients(tempIngredients);
  };

  const debouncedFetchIngredients = useDebounce(fetchIngredients, 200);

  useEffect(() => {
    debouncedFetchIngredients();
  }, [searchTerm]);

  return (
    <div>
      <h3>Ingredients</h3>
      <IngredientsBarStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </IngredientsBarStyles>
      <IngredientsListContainer>
        {displayIngredients?.map((ingredient: any) => (
          <IngredientListItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </IngredientsListContainer>
    </div>
  );
};

export default IngredientsList;
