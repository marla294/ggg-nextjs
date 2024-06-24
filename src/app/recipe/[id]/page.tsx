"use client";

import { useEffect, useState } from "react";
import getRecipes from "../../recipes/getRecipes";
import styled, { css } from "styled-components";
import getRecipeItems from "../../recipes/getRecipeItems";
import RecipeItem from "../../components/RecipeItem";
import AddIngredientToRecipeForm from "../../components/AddIngredientToRecipeForm";
import addIngredientToShoppingList from "../../ingredient/[id]/addIngredientToShoppingList";
import { ThreeDots } from "react-loader-spinner";
import deleteRecipe from "./deleteRecipe";
import { useRouter } from "next/navigation";

const SingleItemStyles = styled.div`
  padding: 0 10%;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .noPhoto {
    width: 100%;
    height: 300px;
    display: grid;
    align-content: center;
    justify-content: center;
    border: 1px dashed var(--black);
  }

  @media (min-width: 768px) {
    padding: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: top;
    grid-gap: 5rem;
  }
`;

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const sharedButtonStyles = css`
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  color: black;
`;

const EditButton = styled.button`
  ${sharedButtonStyles}
  background: var(--green);
  border: 1px solid var(--darkGreen);
`;

const AddToShoppingListButton = styled.button`
  ${sharedButtonStyles}
  background: var(--yellow);
  border: 1px solid var(--darkYellow);
`;

const DeleteRecipeButton = styled.button`
  ${sharedButtonStyles}
  background: var(--orange);
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
  const [loadingAddToShoppingList, setLoadingAddToShoppingList] =
    useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [recipeLoading, setRecipeLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchRecipe = async () => {
    const res = await getRecipes({ id: params.id });
    const tempRecipes = JSON.parse(res as string);
    setRecipe(tempRecipes[0]);
    setRecipeLoading(false);
  };

  const fetchRecipeItems = async (recipeId: string) => {
    const res = await getRecipeItems({ recipeId });
    const tempRecipeItems = JSON.parse(res as string);
    setRecipeItems(tempRecipeItems);
  };

  const addRecipeToShoppingList = async () => {
    for (const item of recipeItems) {
      await addIngredientToShoppingList({
        ingredientId: item?.ingredient?._id,
        quantity: item?.quantity / 10,
      });
    }
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

  const handleDeleteRecipe = async () => {
    setDeleteLoading(true);

    try {
      await deleteRecipe({ recipeId: recipe?._id });
      setDeleteLoading(false);
      router.push("/recipes");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {recipeLoading ? (
        <div>Loading...</div>
      ) : recipe ? (
        <>
          <SingleItemStyles>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={recipe?.photo?.altText || recipe?.name}
                />
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
                <EditButton
                  onClick={() => router.push(`/recipe/${params.id}/edit`)}>
                  Edit Recipe
                </EditButton>
                <AddToShoppingListButton
                  onClick={async () => {
                    setLoadingAddToShoppingList(true);
                    await addRecipeToShoppingList();
                    setLoadingAddToShoppingList(false);
                  }}>
                  {loadingAddToShoppingList ? (
                    <ThreeDots
                      visible={true}
                      height="15"
                      width="40"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        display: "grid",
                        justifyItems: "center",
                      }}
                      wrapperClass=""
                    />
                  ) : (
                    <>Add To Shopping List</>
                  )}
                </AddToShoppingListButton>
                <DeleteRecipeButton
                  onClick={() => {
                    handleDeleteRecipe();
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
                    "Delete Recipe"
                  )}
                </DeleteRecipeButton>
              </ButtonDivStyles>
            </div>
          </SingleItemStyles>
          <div>
            <AddIngredientToRecipeForm recipeId={recipe?._id} />
            <br />
            <h3>Ingredients</h3>
            <RecipeItemContainer>
              {recipeItems?.map((recipeItem: any) => (
                <RecipeItem
                  key={Math.random()}
                  recipeItem={recipeItem}
                  fetchRecipeItems={fetchRecipeItems}
                />
              ))}
            </RecipeItemContainer>
          </div>
        </>
      ) : (
        <div>No recipe found!</div>
      )}
    </>
  );
}
