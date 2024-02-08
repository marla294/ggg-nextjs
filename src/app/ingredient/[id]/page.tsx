"use client";
import { useEffect, useState } from "react";
import getIngredients from "../../ingredients/getIngredients";

export default function Page({ params }: { params: { id: string } }) {
  const [ingredient, setIngredient] = useState<any>();

  const fetchIngredient = async () => {
    const res = await getIngredients({ id: params.id });
    const tempIngredients = JSON.parse(res as string);
    setIngredient(tempIngredients[0]);
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  return (
    <div>
      {ingredient?.photo?.image?._meta?.url && (
        <img
          src={ingredient?.photo?.image?._meta?.url}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      )}
      <h3>{ingredient?.name}</h3>
      <div>Aisle: {ingredient?.aisle}</div>
      <div>Home Area: {ingredient?.homeArea}</div>
      <div>Units: {ingredient?.units}</div>
      <div>Store: {ingredient?.store}</div>
    </div>
  );
}
