"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { BarContainer, ListContainer } from "../ingredients/page";
import getShoppingListItems from "./getShoppingListItems";
import ShoppingListItem from "../components/ShoppingListItem";
import deleteShoppingListItem from "./[id]/deleteShoppingListItem";

const ClearButtonStyles = styled.button`
  width: auto;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--yellow);
  color: var(--darkYellow);
  border: 1px solid var(--darkYellow);
  &:hover {
    background: var(--darkYellow);
    color: white;
  }
`;

const ShoppingListBarStyles = styled.div`
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

const SortByStyles = styled.div`
  display: grid;
  align-items: center;
  @media (min-width: 768px) {
    grid-template-columns: minmax(3.5rem, auto) 1fr;
  }
`;

const sortOptions = [
  { display: "Alphabetical", value: "alphabetical" },
  { display: "Aisle", value: "aisle" },
  { display: "Home area", value: "homeArea" },
  { display: "Store", value: "store" },
];

export default function ShoppingList() {
  const router = useRouter();
  const [displayShoppingListItems, setDisplayShoppingListItems] =
    useState<any>(null);

  useEffect(() => {
    fetchShoppingListItems();
  }, []);

  const fetchShoppingListItems = async () => {
    const res = await getShoppingListItems({});
    const tempShoppingListItems = JSON.parse(res as string);
    setDisplayShoppingListItems(tempShoppingListItems);
  };

  return (
    <div>
      <BarContainer>
        <h3>Shopping List</h3>
        <ShoppingListBarStyles>
          <ClearButtonStyles
            type="button"
            onClick={async () => {
              if (
                confirm(
                  "Are you sure you want to clear the entire shopping list?"
                )
              ) {
                displayShoppingListItems?.forEach(async (item: any) => {
                  await deleteShoppingListItem({
                    shoppingListItemId: item?._id,
                  });
                });
                await fetchShoppingListItems();
              }
            }}>
            Clear
          </ClearButtonStyles>
          <SortByStyles>
            <label htmlFor="sortBy">Sort:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={inputs.sortBy}
              onChange={handleChange}>
              {sortOptions.map((option) => (
                <option
                  value={option.value}
                  name={option.value}
                  id={option.value}
                  key={Math.random()}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles>
        </ShoppingListBarStyles>
      </BarContainer>
      <ListContainer>
        {!!!displayShoppingListItems?.length &&
          "Please add some shopping list items to get started!"}
        {displayShoppingListItems?.map((shoppingListItem: any) => {
          const { ingredient } = shoppingListItem;
          return (
            <ShoppingListItem
              key={ingredient._id}
              ingredient={ingredient}
              quantity={shoppingListItem?.quantity}
              shoppingListItemId={shoppingListItem?._id}
            />
          );
        })}
      </ListContainer>
    </div>
  );
}
