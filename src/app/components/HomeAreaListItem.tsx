"use client";

import { useState } from "react";
import deleteHomeArea from "../homeAreas/deleteHomeArea";

const HomeAreaListItem = ({
  homeArea,
  fetchHomeAreas,
}: {
  homeArea: any;
  fetchHomeAreas: any;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteHomeArea({
        homeAreaId: homeArea._id,
      });
      if (fetchHomeAreas) {
        await fetchHomeAreas();
      }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={homeArea._id}>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}>
        &times;
      </button>
      {homeArea.name}
    </div>
  );
};

export default HomeAreaListItem;
