"use client";

import { useState } from "react";
import deleteUnit from "../units/deleteUnit";

const UnitListItem = ({ unit, fetchUnits }: { unit: any; fetchUnits: any }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteUnit({
        unitId: unit._id,
      });
      if (fetchUnits) {
        await fetchUnits();
      }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={unit._id}>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}>
        &times;
      </button>
      {unit.name}
    </div>
  );
};

export default UnitListItem;
