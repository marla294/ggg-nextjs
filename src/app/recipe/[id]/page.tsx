"use client";

import { useEffect, useState } from "react";
import getRecipes from "../../recipes/getRecipes";
import { SingleItemStyles } from "../../ingredient/[id]/page";
import styled from "styled-components";
import getRecipeItems from "../../recipes/getRecipeItems";
import RecipeItem from "../../components/RecipeItem";
import AddIngredientToRecipeForm from "../../components/AddIngredientToRecipeForm";
import addIngredientToShoppingList from "../../ingredient/[id]/addIngredientToShoppingList";
import { ThreeDots } from "react-loader-spinner";
import deleteRecipe from "./deleteRecipe";
import { useRouter } from "next/navigation";

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
  const [loadingAddToShoppingList, setLoadingAddToShoppingList] =
    useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const router = useRouter();

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
        <h3>Recipe Ingredients</h3>
        <AddIngredientToRecipeForm recipeId={recipe?._id} />
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
  );
}
