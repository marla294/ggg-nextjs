"use client";

import { useEffect, useState } from "react";
import getRecipes from "../../recipes/getRecipes";
import { SingleItemStyles } from "../../ingredient/[id]/page";

export default function Page({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const fetchRecipe = async () => {
    const res = await getRecipes({ id: params.id });
    const tempRecipes = JSON.parse(res as string);
    setRecipe(tempRecipes[0]);
    // setLoading(false);
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
  }, [recipe]);

  return (
    <SingleItemStyles>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={recipe?.photo?.altText || recipe?.name} />
        ) : (
          <div className="noPhoto">Needs photo 📸</div>
        )}
      </div>
    </SingleItemStyles>
  );
}
