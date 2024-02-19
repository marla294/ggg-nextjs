"use client";
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
    text-decoration: underline;
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

const IngredientListItem = ({ ingredient }: { ingredient: any }) => {
  return (
    <ListItemStyles href={`/ingredient/${ingredient?._id}`}>
      {ingredient?.photo?.image?._meta?.url && (
        <img
          src={ingredient?.photo?.image?._meta?.url}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      )}
      {ingredient?.photo?.imageUrl && (
        <img
          src={ingredient?.photo?.imageUrl}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      )}

      <div className="details">{ingredient?.name}</div>
    </ListItemStyles>
  );
};

export default IngredientListItem;
