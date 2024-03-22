"use client";
import { useEffect, useState } from "react";
import { BarContainer, ListContainer } from "../ingredients/page";
import getShoppingListItems from "./getShoppingListItems";
import ShoppingListItem from "../components/ShoppingListItem";

import styled from "styled-components";
import deleteShoppingListItem from "./[id]/deleteShoppingListItem";

const ClearButtonStyles = styled.button`
  width: auto;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
`;

export default function ShoppingList() {
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
          className="yellow small"
          onClick={() => {
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
