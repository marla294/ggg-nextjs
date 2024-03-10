"use client";
import { useEffect, useState } from "react";
import { BarContainer, ListContainer } from "../ingredients/page";
import getShoppingListItems from "./getShoppingListItems";
import ShoppingListItem from "../components/ShoppingListItem";

export default function ShoppingList() {
  const [displayShoppingListItems, setDisplayShoppingListItems] =
    useState<any>(null);

  useEffect(() => {
    fetchShoppingListItems();
  }, []);

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
          const { ingredient } = shoppingListItem;
          console.log({ ingredient });
          return (
            <ShoppingListItem key={ingredient._id} ingredient={ingredient} />
          );
        })}
      </ListContainer>
    </div>
  );
}
