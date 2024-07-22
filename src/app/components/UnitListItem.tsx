"use client";

import { useState } from "react";
// import deleteStore from "../stores/deleteStore";

const UnitListItem = ({ unit, fetchUnits }: { unit: any; fetchUnits: any }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  // const handleDelete = async () => {
  //   setDeleteLoading(true);

  //   try {
  //     await deleteStore({
  //       storeId: store._id,
  //     });
  //     if (fetchStores) {
  //       await fetchStores();
  //     }
  //     setDeleteLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div key={unit._id}>
      <button
        type="button"
        onClick={() => {
          // handleDelete();
        }}>
        &times;
      </button>
      {unit.name}
    </div>
  );
};

export default UnitListItem;
