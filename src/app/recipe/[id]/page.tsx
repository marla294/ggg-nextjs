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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  height: 42.84px;
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
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchRecipe = async () => {
    const res = await getRecipes({ id: params.id });
    const tempRecipes = JSON.parse(res as string);
    return tempRecipes[0];
  };

  const fetchRecipeItems = async () => {
    if (params.id) {
      const res = await getRecipeItems({ recipeId: params.id });
      const tempRecipeItems = JSON.parse(res as string);
      return tempRecipeItems || [];
    } else {
      return [];
    }
  };

  const { data: recipe, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ["recipeQuery"],
    queryFn: fetchRecipe,
  });

  const { data: recipeItems, isLoading: recipeItemsLoading } = useQuery({
    queryKey: ["recipeItemsQuery"],
    queryFn: fetchRecipeItems,
  });

  const addRecipeToShoppingListMutation = useMutation({
    mutationFn: async () => {
      for (const item of recipeItems) {
        await addIngredientToShoppingList({
          ingredientId: item?.ingredient?._id,
          quantity: item?.quantity / 10,
          recipeId: params?.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipeQuery", "shoppingListItems"],
      });
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: async () => {
      try {
        await deleteRecipe({ recipeId: recipe?._id });
        router.push("/recipes");
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipeQuery", "shoppingListItems"],
      });
    },
  });

  useEffect(() => {
    if (recipe?.photo?.image?._meta?.url) {
      setImageUrl(recipe?.photo?.image?._meta?.url);
    } else if (recipe?.photo?.imageUrl) {
      setImageUrl(recipe?.photo?.imageUrl);
    } else {
      setImageUrl(null);
    }
  }, [recipe]);

  const handleDeleteRecipe = () => {
    const confirmed = confirm("Are you sure you want to delete?");

    if (!confirmed) return;

    deleteRecipeMutation.mutate();
  };

  return (
    <div>
      {isLoadingRecipe ? (
        <div>
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
        </div>
      ) : (
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
                  onClick={() => {
                    addRecipeToShoppingListMutation.mutate();
                  }}>
                  {addRecipeToShoppingListMutation?.isPending ? (
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
                  {deleteRecipeMutation?.isPending ? (
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
              {addRecipeToShoppingListMutation?.isPending && (
                <div>Adding to shopping list...</div>
              )}
              {addRecipeToShoppingListMutation?.isSuccess && (
                <div>Added to shopping list!</div>
              )}
            </div>
          </SingleItemStyles>
          <div>
            <AddIngredientToRecipeForm recipeId={recipe?._id} />
            <br />
            <h3>Ingredients</h3>
            <RecipeItemContainer>
              {recipeItemsLoading ? (
                <div>
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
                </div>
              ) : (
                recipeItems?.map((recipeItem: any) => (
                  <RecipeItem
                    key={Math.random()}
                    recipeItem={recipeItem}
                    fetchRecipeItems={fetchRecipeItems}
                  />
                ))
              )}
            </RecipeItemContainer>
          </div>
        </>
      )}
    </div>
  );
}
