"use client";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import deleteShoppingListItem from "../shoppingList/[id]/deleteShoppingListItem";

const DeleteButton = styled.button`
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

export default function DeleteFromShoppingListButton({
  shoppingListItem,
  isInList,
  fetchShoppingListItems,
}: {
  shoppingListItem: any;
  isInList: boolean;
  fetchShoppingListItems?: any;
}) {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteShoppingListItem({
        ingredientId: shoppingListItem?.ingredient?._id,
      });
      if (fetchShoppingListItems) {
        await fetchShoppingListItems();
      }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DeleteButton
      type="button"
      onClick={() => {
        handleDelete();
      }}
      style={!isInList ? { width: "300px", height: "40px" } : {}}>
      {deleteLoading ? (
        <ThreeDots
          visible={true}
          height="13"
          width="40"
          color="#551d11"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: "grid",
            justifyItems: "center",
          }}
          wrapperClass=""
        />
      ) : isInList ? (
        "Remove"
      ) : (
        "Remove From Shopping List"
      )}
    </DeleteButton>
  );
}
