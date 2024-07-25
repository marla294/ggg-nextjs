"use client";

import { useState } from "react";
import deleteRecipeType from "../recipeTypes/deleteRecipeType";

const RecipeTypeListItem = ({
  recipeType,
  fetchRecipeTypes,
}: {
  recipeType: any;
  fetchRecipeTypes: any;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteRecipeType({
        recipeTypeId: recipeType._id,
      });
      if (fetchRecipeTypes) {
        await fetchRecipeTypes();
      }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={recipeType?._id}>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}>
        &times;
      </button>
      {recipeType?.name}
    </div>
  );
};

export default RecipeTypeListItem;
