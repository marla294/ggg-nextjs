"use client";
import { useEffect, useState } from "react";
import { BarContainer, ListContainer } from "../ingredients/page";
import getShoppingListItems from "./getShoppingListItems";

export default function ShoppingList() {
  const [displayShoppingListItems, setDisplayShoppingListItems] =
    useState<any>(null);

  useEffect(() => {
    fetchShoppingListItems();
  }, []);

  useEffect(() => {
    console.log({ displayShoppingListItems });
  }, [displayShoppingListItems]);

  const fetchShoppingListItems = async () => {
    const res = await getShoppingListItems();
    const tempShoppingListItems = JSON.parse(res as string);
    setDisplayShoppingListItems(tempShoppingListItems);
  };

  return (
    <div>
      <BarContainer>
        <h3>Shopping List</h3>
      </BarContainer>
      <ListContainer>
        {displayShoppingListItems?.map((shoppingListItem: any) => {
          return <div>{shoppingListItem?.ingredient?.name}</div>;
        })}
      </ListContainer>
    </div>
  );
}
