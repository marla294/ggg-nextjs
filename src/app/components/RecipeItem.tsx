"use client";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import deleteRecipeItem from "../recipe/[id]/deleteRecipeItem";

const ListItemStyles = styled.div`
  background: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10rem 5fr;
  border: 1px solid var(--lightGray);
  &:hover {
    background: var(--lightGray);
    cursor: pointer;
  }

  img {
    padding: 1rem;
    object-fit: cover;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
  }

  .noPhoto {
    padding: 1rem;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
    font-size: 4rem;
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
    margin-left: 2rem;
    align-self: center;
    justify-self: center;
  }
`;

const DeleteButton = styled.button`
  @media (min-width: 768px) {
    width: 200px;
  }
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

const RecipeItem = ({
  recipeItem,
  fetchRecipeItems,
}: {
  recipeItem: any;
  fetchRecipeItems: any;
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [ingredient, setIngredient] = useState<any>();

  useEffect(() => {
    const { ingredient: ingredientTemp } = recipeItem;

    if (ingredientTemp) {
      setIngredient(ingredientTemp);
    }

    if (ingredientTemp?.photo?.image?._meta?.url) {
      setImageUrl(recipeItem?.ingredient?.photo?.image?._meta?.url);
    }

    if (ingredientTemp?.photo?.imageUrl) {
      setImageUrl(recipeItem?.ingredient?.photo?.imageUrl);
    }
  }, [recipeItem]);

  const onDeleteRecipeItem = async () => {
    try {
      await deleteRecipeItem({
        recipeItemId: recipeItem?._id,
      });
      await fetchRecipeItems(recipeItem?.recipe?._id);
    } catch (e) {
      console.error(e);
    }
  };

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

      <div className="details">
        <h4>{ingredient?.name}</h4>
        <div>
          <div>
            Quantity: {recipeItem?.quantity / 10}{" "}
            {ingredient?.units === "none" ? "" : ingredient?.units}
          </div>
        </div>
      </div>
      <DeleteButton onClick={onDeleteRecipeItem}>Remove</DeleteButton>
    </ListItemStyles>
  );
};

export default RecipeItem;
