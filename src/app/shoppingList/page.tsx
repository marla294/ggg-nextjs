"use client";
import { useState } from "react";
import { BarContainer, ListContainer } from "../ingredients/page";

export default function ShoppingList() {
  const [displayShoppingListItems, setDisplayShoppingListItems] =
    useState<any>(null);

  return (
    <div>
      <BarContainer>
        <h3>Shopping List</h3>
      </BarContainer>
      <ListContainer>List items go here</ListContainer>
    </div>
  );
}
