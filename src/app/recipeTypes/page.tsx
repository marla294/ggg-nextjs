"use client";
import getRecipeTypes from "./getRecipeTypes";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import RecipeTypeListItem from "../components/RecipeTypeListItem";

const ListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 4rem;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 280px;
  align-items: center;
`;

const AddRecipeTypeLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function RecipeTypes() {
  const [recipeTypes, setRecipeTypes] = useState<any>(null);

  const fetchRecipeTypes = async () => {
    const res = await getRecipeTypes();
    const tempRecipeTypes = JSON.parse(res as string);
    setRecipeTypes(tempRecipeTypes);
  };

  useEffect(() => {
    fetchRecipeTypes();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <h3>Recipe Types</h3>
        <Link href="stores/add">
          <AddRecipeTypeLinkText>+ Add RecipeType</AddRecipeTypeLinkText>
        </Link>
      </HeaderContainer>

      <ListContainer>
        {recipeTypes?.map((recipeType: any) => (
          <RecipeTypeListItem
            recipeType={recipeType}
            fetchRecipeTypes={fetchRecipeTypes}
          />
        ))}
      </ListContainer>
    </div>
  );
}
