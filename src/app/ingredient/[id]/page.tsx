"use client";
import { useEffect, useState } from "react";
import getIngredients from "../../ingredients/getIngredients";
import styled from "styled-components";

const SingleItemStyles = styled.div`
  padding: 0 10%;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .noPhoto {
    width: 100%;
    max-height: 300px;
    display: grid;
    align-content: center;
    justify-content: center;
    border: 1px dashed var(--black);
  }

  @media (min-width: 768px) {
    padding: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: top;
    grid-gap: 5rem;
  }
`;

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
    <SingleItemStyles>
      <div>
        {ingredient?.photo?.image?._meta?.url ? (
          <img
            src={ingredient?.photo?.image?._meta?.url}
            alt={ingredient?.photo?.altText || ingredient?.name}
          />
        ) : (
          <div className="noPhoto">Needs photo 📸</div>
        )}
      </div>
      <div>
        <h3>{ingredient?.name}</h3>
        <div>Aisle: {ingredient?.aisle}</div>
        <div>Home Area: {ingredient?.homeArea}</div>
        <div>Units: {ingredient?.units}</div>
        <div>Store: {ingredient?.store}</div>
      </div>
    </SingleItemStyles>
  );
}
