"use client";
import getIngredients from "./getIngredients";
import { useEffect, useState } from "react";
import IngredientListItem from "../components/IngredientListItem";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import Link from "next/link";

const IngredientsBarStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.8rem;

  input,
  select {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1rem;
    height: 2rem;
  }
`;

const BarContainer = styled.div`
  position: fixed;
  top: 4.45rem;
  left: 0;
  background-color: white !important;
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
`;

const ListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 7rem;
`;

const IngredientsHeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 280px;
  align-items: center;
`;

const AddIngredientLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function Ingredients() {
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
      <BarContainer>
        <IngredientsHeaderContainer>
          <h3>Ingredients</h3>
          <Link href="ingredients/add">
            <AddIngredientLinkText>+ Add Ingredient</AddIngredientLinkText>
          </Link>
        </IngredientsHeaderContainer>
        <IngredientsBarStyles>
          <input
            name="searchTerm"
            id="searchTerm"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </IngredientsBarStyles>
      </BarContainer>
      <ListContainer>
        {displayIngredients?.map((ingredient: any) => (
          <IngredientListItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </ListContainer>
    </div>
  );
}
