"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const ListItemStyles = styled(Link)`
  background: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10rem 5fr;
  border: 1px solid var(--lightGray);
  &:hover {
    background: var(--lightGray);
    cursor: pointer;
  }

  img {
    padding: 1rem;
    object-fit: cover;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
  }

  .noPhoto {
    padding: 1rem;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
    font-size: 4rem;
    text-align: center;
  }

  .details {
    width: 100%;
    padding: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2rem;
    align-self: center;
    justify-self: center;
  }
`;

const RecipeListItem = ({ recipe }: { recipe: any }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (recipe?.photo?.image?._meta?.url) {
      setImageUrl(recipe?.photo?.image?._meta?.url);
    }
    if (recipe?.photo?.imageUrl) {
      setImageUrl(recipe?.photo?.imageUrl);
    }
  }, [recipe]);

  return (
    <ListItemStyles href={`/recipe/${recipe?._id}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={recipe?.photo?.altText || recipe?.name} />
      ) : (
        <div className="noPhoto">🛒</div>
      )}

      <div className="details">{recipe?.name}</div>
    </ListItemStyles>
  );
};

export default RecipeListItem;
