"use client";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteFromShoppingListButton from "./DeleteFromShoppingListButton";

const ListItemStyles = styled.div`
  background: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 5rem 5fr;
  border: 1px solid var(--lightGray);
  &:hover {
    background: var(--lightGray);
    cursor: pointer;
  }

  img {
    padding: 1rem;
    object-fit: cover;
    height: 5rem;
    min-width: 5rem;
    width: 5rem;
  }

  .noPhoto {
    padding: 1rem;
    height: 5rem;
    min-width: 5rem;
    width: 5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  .details {
    width: 100%;
    padding: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    justify-self: center;
  }
`;

const ShoppingListItem = ({
  ingredient,
  quantity,
  shoppingListItemId,
  fetchShoppingListItems,
}: {
  ingredient: any;
  quantity?: any;
  shoppingListItemId?: any;
  fetchShoppingListItems?: any;
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (ingredient?.photo?.image?._meta?.url) {
      setImageUrl(ingredient?.photo?.image?._meta?.url);
    }
    if (ingredient?.photo?.imageUrl) {
      setImageUrl(ingredient?.photo?.imageUrl);
    }
  }, [ingredient]);

  return (
    <ListItemStyles>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      ) : (
        <div className="noPhoto">🛒</div>
      )}

      <Link className="details" href={`/shoppingList/${shoppingListItemId}`}>
        <h5>{ingredient?.name}</h5>
        <h6>
          Amount: {quantity / 10}{" "}
          {ingredient?.units === "none" ? "" : ingredient?.units}
        </h6>
      </Link>
      <DeleteFromShoppingListButton
        shoppingListItem={{ _id: shoppingListItemId }}
        isInList={true}
        fetchShoppingListItems={fetchShoppingListItems}
      />
    </ListItemStyles>
  );
};

export default ShoppingListItem;
