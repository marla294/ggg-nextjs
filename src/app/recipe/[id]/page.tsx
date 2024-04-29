"use client";

import { useEffect, useState } from "react";
import getRecipes from "../../recipes/getRecipes";
import { SingleItemStyles } from "../../ingredient/[id]/page";
import styled from "styled-components";
import getRecipeItems from "../../recipes/getRecipeItems";
import RecipeItem from "../../components/RecipeItem";
import AddIngredientToRecipeForm from "../../components/AddIngredientToRecipeForm";

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

const RecipeItemContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 10px;
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
        <AddIngredientToRecipeForm loading={false} />
        <RecipeItemContainer>
          {recipeItems?.map((recipeItem: any) => (
            <RecipeItem recipeItem={recipeItem} />
          ))}
        </RecipeItemContainer>
      </div>
    </>
  );
}
