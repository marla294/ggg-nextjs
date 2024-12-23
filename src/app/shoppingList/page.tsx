"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getShoppingListItems from "./getShoppingListItems";
import ShoppingListItem from "../components/ShoppingListItem";
import deleteShoppingListItem from "./[id]/deleteShoppingListItem";
import { ThreeDots } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ClearButtonStyles = styled.button`
  width: 8rem;
  margin: 0 !important;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  background: var(--yellow);
  color: var(--darkYellow);
  border: 1px solid var(--darkYellow);
  &:hover {
    background: var(--darkYellow);
    color: white;
  }
`;

const ListBarStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;
  font-size: 1rem;

  input {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1rem;
    height: 2rem;
  }

  select {
    padding: 0 10px;
    border: 1px solid black;
    font-size: 1rem;
    height: 2rem;
  }
`;

const SortByStyles = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(2.5rem, auto) 1fr;
  label {
    font-size: 1rem;
  }
`;

const GroupingContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const CenteredContainer = styled.div`
  height: 50vh;
  display: grid;
  align-items: center;
  justify-content: center;
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
  margin-top: 4rem;
`;

type SortOption = {
  display: string;
  value: string;
};

enum Sort {
  alphabetical = "alphabetical",
  aisle = "aisle",
  homeArea = "homeArea",
  store = "store",
  recipe = "recipe",
}

const sortOptions: SortOption[] = [
  { display: "Alphabetical", value: Sort.alphabetical },
  { display: "Aisle", value: Sort.aisle },
  { display: "Home area", value: Sort.homeArea },
  { display: "Store", value: Sort.store },
  { display: "Recipe", value: Sort.recipe },
];

export default function ShoppingList() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<any>(Sort.homeArea);

  const fetchShoppingListItems = async () => {
    const res = await getShoppingListItems({ sortBy });
    const result = JSON.parse(res as string);
    return result;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shoppingListItems", { sortBy }],
    queryFn: fetchShoppingListItems,
  });

  const handleChange = (e: any) => {
    const val = e.target.value;
    const sort = (Sort as any)[val];
    setSortBy(sort);
  };

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    if (params.get("sortBy")) {
      setSortBy(params.get("sortBy") || Sort.homeArea);
    }
  }, []);

  return (
    <>
      <BarContainer>
        <h3>Shopping List</h3>
        <ListBarStyles>
          <ClearButtonStyles
            type="button"
            onClick={async () => {
              if (
                confirm(
                  "Are you sure you want to clear the entire shopping list?"
                )
              ) {
                data?.forEach(async (grouping: any) => {
                  grouping[1]?.forEach(async (item: any) => {
                    await deleteShoppingListItem({
                      ingredientId: item?.ingredient?._id,
                    });
                  });
                });
                queryClient.invalidateQueries({
                  queryKey: ["shoppingListItems"],
                });
              }
            }}>
            Clear
          </ClearButtonStyles>
          <SortByStyles>
            <label htmlFor="sortBy">Sort:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={handleChange}>
              {sortOptions.map((option, index) => (
                <option
                  value={option.value}
                  id={option.value}
                  key={index}
                  label={option.display}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles>
        </ListBarStyles>
      </BarContainer>
      <ListContainer>
        {isLoading && (
          <CenteredContainer>
            <ThreeDots
              visible={true}
              height="13"
              width="40"
              color="gray"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                display: "grid",
                justifyItems: "center",
              }}
              wrapperClass=""
            />
          </CenteredContainer>
        )}
        {isError && (
          <CenteredContainer>An error has occurred</CenteredContainer>
        )}
        {!isLoading &&
          data?.map((grouping: any) => {
            return (
              <div key={grouping[0]}>
                <h3>
                  {grouping[0]}{" "}
                  <button
                    type="button"
                    onClick={async () => {
                      grouping[1]?.forEach(async (item: any) => {
                        await deleteShoppingListItem({
                          shoppingListItemId: item?._id,
                        });
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["shoppingListItems"],
                      });
                    }}>
                    &times;
                  </button>
                </h3>
                <GroupingContainer>
                  {grouping[1]?.map((shoppingListItem: any) => {
                    const { ingredient } = shoppingListItem;
                    return (
                      <ShoppingListItem
                        key={ingredient._id}
                        ingredient={ingredient}
                        quantity={shoppingListItem?.quantity}
                        shoppingListItemId={shoppingListItem?._id}
                        sortBy={sortBy}
                      />
                    );
                  })}
                </GroupingContainer>
              </div>
            );
          })}
      </ListContainer>
    </>
  );
}
