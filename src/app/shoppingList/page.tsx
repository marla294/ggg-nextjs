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
