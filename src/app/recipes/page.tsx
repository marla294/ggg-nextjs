"use client";

import { useEffect, useState } from "react";
import getRecipes from "./getRecipes";
import { ListContainer } from "../ingredients/page";
import RecipeListItem from "../components/RecipeListItem";

export default function Recipes() {
  const [displayRecipes, setDisplayRecipes] = useState<any>(null);

  const fetchRecipes = async () => {
    const res = await getRecipes({});
    const tempRecipes = JSON.parse(res as string);
    setDisplayRecipes(tempRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <ListContainer>
        {displayRecipes?.map((recipe: any) => (
          <RecipeListItem key={recipe._id} recipe={recipe} />
        ))}
      </ListContainer>
    </div>
  );
}
