"use client";

import { useEffect, useState } from "react";
import getRecipes from "../../recipes/getRecipes";
import { SingleItemStyles } from "../../ingredient/[id]/page";
import styled from "styled-components";
import getRecipeItems from "../../recipes/getRecipeItems";
import RecipeItem from "../../components/RecipeItem";

export const ListItemStyles = styled.div`
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

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
`;

const AddToShoppingListButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--yellow);
  color: black;
  border: 1px solid var(--darkYellow);
`;

const DeleteRecipeButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--orange);
  color: black;
  border: 1px solid var(--black);
`;

export default function Page({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>();
  const [recipeItems, setRecipeItems] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const fetchRecipe = async () => {
    const res = await getRecipes({ id: params.id });
    const tempRecipes = JSON.parse(res as string);
    setRecipe(tempRecipes[0]);
    // setLoading(false);
  };

  const fetchRecipeItems = async (recipeId: string) => {
    const res = await getRecipeItems({ recipeId });
    const tempRecipeItems = JSON.parse(res as string);
    setRecipeItems(tempRecipeItems);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe?.photo?.image?._meta?.url) {
      setImageUrl(recipe?.photo?.image?._meta?.url);
    }
    if (recipe?.photo?.imageUrl) {
      setImageUrl(recipe?.photo?.imageUrl);
    }
    if (recipe?._id) {
      fetchRecipeItems(recipe._id);
    }
  }, [recipe]);

  return (
    <>
      <SingleItemStyles>
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt={recipe?.photo?.altText || recipe?.name} />
          ) : (
            <div className="noPhoto">Needs photo 📸</div>
          )}
        </div>
        <div>
          <h3>{recipe?.name}</h3>
          <div>{recipe?.description}</div>
          {recipe?.recipeLink && (
            <a target="_blank" href={recipe?.recipeLink}>
              Recipe Link
            </a>
          )}
          <ButtonDivStyles>
            <EditButton>Edit Recipe</EditButton>
            <AddToShoppingListButton>
              Add To Shopping List
            </AddToShoppingListButton>
            <DeleteRecipeButton>Delete Recipe</DeleteRecipeButton>
          </ButtonDivStyles>
        </div>
      </SingleItemStyles>
      <div>
        <h3>Recipe Ingredients</h3>
        <AddToShoppingListButton>
          Add ingredient to recipe
        </AddToShoppingListButton>
        <>
          {recipeItems?.map((recipeItem: any) => (
            <RecipeItem recipeItem={recipeItem} />
          ))}
        </>
      </div>
    </>
  );
}
