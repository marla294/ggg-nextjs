"use client";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import deleteRecipeItem from "../recipe/[id]/deleteRecipeItem";
import useForm from "../lib/useForm";
import editRecipeItem from "../recipe/[id]/editRecipeItem";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const recipeItemRef = useRef<any>(null);
  const { handleChange, inputs, setInputs } = useForm({
    quantity: "",
  });
  const queryClient = useQueryClient();

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

    if (recipeItem?.quantity) {
      setInputs({ ...inputs, quantity: recipeItem.quantity / 10 });
    }
  }, [recipeItem]);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        recipeItemRef.current &&
        !recipeItemRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mouseDown", handleDocumentClick);
    };
  }, [isEditing]);

  const onDeleteRecipeItem = async () => {
    try {
      await deleteRecipeItem({
        recipeItemId: recipeItem?._id,
      });
      await fetchRecipeItems(recipeItem?.recipe?._id);
      const invalidateQueriesFilters = [
        "recipeItemsQuery",
      ] as InvalidateQueryFilters;
      queryClient.invalidateQueries(invalidateQueriesFilters);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeRecipeItemQuantity = async () => {
    try {
      await editRecipeItem({
        id: recipeItem?._id,
        quantity: inputs?.quantity,
      });
      await fetchRecipeItems(recipeItem?.recipe?._id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ListItemStyles
      onClick={() => {
        setIsEditing(true);
      }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      ) : (
        <div className="noPhoto">🛒</div>
      )}

      <div className="details" ref={recipeItemRef}>
        <h4>{ingredient?.name}</h4>
        <div>
          {isEditing && (
            <h4>
              Quantity:{" "}
              <input
                required
                type="text"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                value={inputs?.quantity}
                onChange={handleChange}
              />{" "}
              {ingredient?.units === "none" ? "" : ingredient?.units}{" "}
              <button
                onClick={() => {
                  handleChangeRecipeItemQuantity();
                  setIsEditing(false);
                }}>
                Submit
              </button>
            </h4>
          )}
          {!isEditing && (
            <div>
              Quantity: {recipeItem?.quantity / 10}{" "}
              {ingredient?.units === "none" ? "" : ingredient?.units}
            </div>
          )}
        </div>
      </div>
      <DeleteButton onClick={onDeleteRecipeItem}>Remove</DeleteButton>
    </ListItemStyles>
  );
};

export default RecipeItem;
