"use client";

import { useState } from "react";
import deleteAisle from "../aisles/deleteAisle";

const AisleListItem = ({
  aisle,
  fetchAisles,
}: {
  aisle: any;
  fetchAisles: any;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteAisle({
        aisleId: aisle._id,
      });
      if (fetchAisles) {
        await fetchAisles();
      }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={aisle?._id}>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}>
        &times;
      </button>
      {aisle?.name}
    </div>
  );
};

export default AisleListItem;
