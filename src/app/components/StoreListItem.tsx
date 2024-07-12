"use client";

import { useState } from "react";
import deleteStore from "../stores/deleteStore";

const StoreListItem = ({ store }: { store: any }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteStore({
        storeId: store._id,
      });
      // if (fetchShoppingListItems) {
      //   await fetchShoppingListItems();
      // }
      setDeleteLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={store._id}>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}>
        &times;
      </button>
      {store.name}
    </div>
  );
};

export default StoreListItem;
