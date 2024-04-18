"use client";
import { useEffect, useState } from "react";
import { ListItemStyles } from "./IngredientListItem";

const RecipeListItem = ({ recipe }: { recipe: any }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (recipe?.photo?.image?._meta?.url) {
      setImageUrl(recipe?.photo?.image?._meta?.url);
    }
    if (recipe?.photo?.imageUrl) {
      setImageUrl(recipe?.photo?.imageUrl);
    }
  }, [recipe]);

  return (
    <ListItemStyles href={`/recipe/${recipe?._id}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={recipe?.photo?.altText || recipe?.name} />
      ) : (
        <div className="noPhoto">🛒</div>
      )}

      <div className="details">{recipe?.name}</div>
    </ListItemStyles>
  );
};

export default RecipeListItem;
