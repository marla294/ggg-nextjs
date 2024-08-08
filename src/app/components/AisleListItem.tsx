"use client";

import { useState } from "react";
// import deleteRecipeType from "../recipeTypes/deleteRecipeType";

const AisleListItem = ({
  aisle,
  fetchAisles,
}: {
  aisle: any;
  fetchAisles: any;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  // const handleDelete = async () => {
  //   setDeleteLoading(true);

  //   try {
  //     await deleteService({
  //       recipeTypeId: service._id,
  //     });
  //     if (fetchService) {
  //       await fetchService();
  //     }
  //     setDeleteLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div key={aisle?._id}>
      <button
        type="button"
        onClick={() => {
          // handleDelete();
        }}>
        &times;
      </button>
      {aisle?.name}
    </div>
  );
};

export default AisleListItem;
