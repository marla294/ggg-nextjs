import { useCallback, useEffect, useState } from "react";
import deleteIngredient from "./deleteIngredient";
import getRecipeItems from "../../recipes/getRecipeItems";
import { useRouter } from "next/navigation";
import getIngredients from "../../ingredients/getIngredients";

const useIngredient = (id: any) => {
  const [ingredient, setIngredient] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [recipesLoading, setRecipesLoading] = useState<boolean>(true);
  const [addToShoppingListLoading, setAddToShoppingListLoading] =
    useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [recipes, setRecipes] = useState<any>();
  const router = useRouter();

  const fetchIngredient = useCallback(async () => {
    const res = await getIngredients({ id });
    const tempIngredients = JSON.parse(res as string);
    setIngredient(tempIngredients[0]);
    setLoading(false);
  }, []);

  const fetchRecipes = useCallback(async () => {
    if (ingredient) {
      const res = await getRecipeItems({ ingredientId: ingredient?._id });
      const tempRecipeItems = JSON.parse(res as string);
      const tempRecipes = tempRecipeItems.map(
        (recipeItem: any) => recipeItem?.recipe?.name,
      );
      setRecipes(tempRecipes);
      setRecipesLoading(false);
    }
  }, [ingredient]);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteIngredient({
        ingredientId: ingredient?._id,
      });
      setLoading(false);
      router.push("/ingredients");
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuantityChange = (e: any) => {
    const val = e.target.value;
    setQuantity(val);
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  useEffect(() => {
    if (ingredient?.photo?.image?._meta?.url) {
      setImageUrl(ingredient?.photo?.image?._meta?.url);
    }
    if (ingredient?.photo?.imageUrl) {
      setImageUrl(ingredient?.photo?.imageUrl);
    }
    fetchRecipes();
  }, [ingredient]);

  return {
    ingredient,
    loading,
    imageUrl,
    deleteLoading,
    recipesLoading,
    addToShoppingListLoading,
    setAddToShoppingListLoading,
    quantity,
    recipes,
    handleDelete,
    handleQuantityChange,
  };
};

export default useIngredient;
