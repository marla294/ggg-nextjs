"use client";

import { useEffect, useState } from "react";
import getRecipes from "./getRecipes";
import { BarContainer, ListContainer } from "../ingredients/page";
import RecipeListItem from "../components/RecipeListItem";
import {
  GroupingContainer,
  ListBarStyles,
  SortByStyles,
  SortOption,
} from "../shoppingList/page";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

enum Sort {
  alphabetical = "alphabetical",
  type = "type",
}

const sortOptions: SortOption[] = [
  { display: "Alphabetical", value: Sort.alphabetical },
  { display: "Type", value: Sort.type },
];

export default function Recipes() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [displayRecipes, setDisplayRecipes] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>(Sort.alphabetical);

  const fetchRecipes = async (sort: string) => {
    const res = await getRecipes({ sort });
    const tempRecipes = JSON.parse(res as string);
    setDisplayRecipes(tempRecipes);
  };

  const handleChange = (e: any) => {
    const val = e.target.value;
    setSortBy(val);
  };

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    let tempSort: any = null;
    if (params.get("sortBy")) {
      tempSort = params.get("sortBy") || Sort.alphabetical;
      setSortBy(tempSort);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    params.set("sortBy", sortBy);
    router.push(pathname + "?" + params.toString());
    fetchRecipes(sortBy);
  }, [sortBy]);

  return (
    <>
      <BarContainer>
        <h3>Recipes</h3>
        <ListBarStyles>
          <AddButtonStyles
            type="button"
            onClick={() => {
              router.push("/recipes/add");
            }}>
            Add
          </AddButtonStyles>
          <SortByStyles>
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
          </SortByStyles>
        </ListBarStyles>
      </BarContainer>
      <ListContainer>
        {displayRecipes?.map((grouping: any) => {
          return (
            <div key={grouping[0]}>
              <h3>{grouping[0]}</h3>
              <GroupingContainer>
                {grouping[1]?.map((recipe: any) => {
                  return <RecipeListItem key={recipe._id} recipe={recipe} />;
                })}
              </GroupingContainer>
            </div>
          );
        })}
      </ListContainer>
    </>
  );
}
