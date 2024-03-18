"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import deleteShoppingListItem from "../shoppingList/[id]/deleteShoppingListItem";
import ShoppingListItem from "../../../models/ShoppingListItem";

const DeleteButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

export default function DeleteFromShoppingListButton({
  shoppingListItem,
}: {
  shoppingListItem: any;
}) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteShoppingListItem({
        shoppingListItemId: shoppingListItem?._id,
      });
      setDeleteLoading(false);
      router.push("/shoppingList");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DeleteButton
      type="button"
      onClick={() => {
        handleDelete();
      }}>
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
      ) : (
        "Remove from shopping list"
      )}
    </DeleteButton>
  );
}
