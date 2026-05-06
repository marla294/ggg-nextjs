import { useCallback, useEffect, useReducer, useState } from "react";
import deleteIngredient from "./deleteIngredient";
import getRecipeItems from "../../recipes/getRecipeItems";
import { useRouter } from "next/navigation";
import getIngredients from "../../ingredients/getIngredients";

type Action = {
  type: string;
  payload: any;
};

const useIngredient = (id: string) => {
  const [addToShoppingListLoading, setAddToShoppingListLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "fetchIngredientSuccess":
        return { ...state, loading: false, ingredient: action.payload };
      case "fetchRecipes":
        return { ...state, recipesLoading: false, recipes: action.payload };
      case "setLoadingState":
        return { ...state, loading: action.payload };
      case "setDeleteLoadingState":
        return { ...state, deleteLoading: action.payload };
      case "setImageUrl":
        return { ...state, imageUrl: action.payload };
      case "updateQuantity":
        return { ...state, quantity: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ingredient: null,
    loading: true,
    imageUrl: "",
    deleteLoading: false,
    recipesLoading: true,
    quantity: 1,
    recipes: null,
  });

  const fetchIngredient = useCallback(async () => {
    dispatch({ type: "setLoadingState", payload: true });
    try {
      const res = await getIngredients({ id });
      const tempIngredients = JSON.parse(res as string);
      dispatch({ type: "fetchIngredientSuccess", payload: tempIngredients[0] });
    } catch (e) {
      console.error(e);
      dispatch({ type: "setLoadingState", payload: false });
    }
  }, []);

  const fetchRecipes = useCallback(async () => {
    if (state.ingredient) {
      const res = await getRecipeItems({ ingredientId: state.ingredient?._id });
      const tempRecipeItems = JSON.parse(res as string);
      const tempRecipes = tempRecipeItems.map(
        (recipeItem: any) => recipeItem?.recipe?.name,
      );
      dispatch({ type: "fetchRecipes", payload: tempRecipes });
    }
  }, [state.ingredient]);

  const handleDelete = async () => {
    dispatch({ type: "setDeleteLoadingState", payload: true });

    try {
      await deleteIngredient({
        ingredientId: state.ingredient?._id,
      });
      dispatch({ type: "setDeleteLoadingState", payload: false });
      router.push("/ingredients");
    } catch (e) {
      console.error(e);
      dispatch({ type: "setDeleteLoadingState", payload: false });
    }
  };

  const handleQuantityChange = (e: any) => {
    dispatch({ type: "updateQuantity", payload: e.target.value });
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  // TODO: refactor
  useEffect(() => {
    if (state.ingredient?.photo?.image?._meta?.url) {
      dispatch({
        type: "setImageUrl",
        payload: state.ingredient?.photo?.image?._meta?.url,
      });
    }
    if (state.ingredient?.photo?.imageUrl) {
      dispatch({
        type: "setImageUrl",
        payload: state.ingredient?.photo?.imageUrl,
      });
    }
    fetchRecipes();
  }, [state.ingredient]);

  return {
    ingredient: state.ingredient,
    loading: state.loading,
    imageUrl: state.imageUrl,
    deleteLoading: state.deleteLoading,
    recipesLoading: state.recipesLoading,
    addToShoppingListLoading,
    setAddToShoppingListLoading,
    quantity: state.quantity,
    recipes: state.recipes,
    handleDelete,
    handleQuantityChange,
  };
};

export default useIngredient;
