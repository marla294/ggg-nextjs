"use client";

import { useEffect, useState } from "react";
import getRecipes from "./getRecipes";
import RecipeListItem from "../components/RecipeListItem";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const ListBarStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.3rem;
  font-size: 0.8rem;

  input,
  select {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1rem;
    height: 2rem;
  }
`;

const SortByStyles = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(3.5rem, auto) 1fr;
  label {
    font-size: 1rem;
  }
`;

const AddButtonStyles = styled.button`
  width: 5rem;
  margin: 0 !important;
  padding: 0.5rem 0.7rem;
  font-size: 1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
  &:hover {
    background: var(--darkGreen);
    color: white;
  }
`;

const GroupingContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

type SortOption = {
  display: string;
  value: string;
};

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
  margin-top: 4rem;
`;

const sortOptions: SortOption[] = [
  { display: "Alphabetical", value: "alphabetical" },
  { display: "Type", value: "type" },
];

export default function Recipes() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>("type");

  const fetchRecipes = async (sort: string) => {
    const res = await getRecipes({ sortBy: sort });
    const tempRecipes = JSON.parse(res as string);
    return tempRecipes;
  };

  const setSortByParams = (sort: any) => {
    const params = new URLSearchParams((searchParams || "").toString());
    params.set("sortBy", sort);
    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    let tempSort: any = null;
    if (params.get("sortBy")) {
      tempSort = params.get("sortBy") || "alphabetical";
      setSortBy(tempSort);
    }
  }, []);

  const { data: displayRecipes, isLoading } = useQuery({
    queryKey: ["recipes", { sortBy }],
    queryFn: async () => {
      const tempRecipes = await fetchRecipes(sortBy);
      setSortByParams(sortBy);
      return tempRecipes;
    },
  });

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
              value={sortBy || sortOptions[0].value}
              onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map((option) => (
                <option
                  value={option.value}
                  id={option.value}
                  key={option.value}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles>
        </ListBarStyles>
      </BarContainer>
      <ListContainer>
        <div>Sort: {sortBy}</div>
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
