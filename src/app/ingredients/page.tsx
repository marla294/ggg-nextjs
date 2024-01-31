"use server";
// import styled from "styled-components";
import getIngredients from "./action";
import IngredientListItem from "../components/IngredientListItem";
import IngredientsList from "../components/IngredientsList";

// const ListItemStyles = styled.div`
//   background: white;
//   display: grid;
//   grid-auto-flow: column;
//   grid-template-columns: 10rem 5fr;

//   img {
//     object-fit: cover;
//     height: 10rem;
//     min-width: 10rem;
//     width: 5rem;
//   }

//   .noPhoto {
//     height: 10rem;
//     min-width: 10rem;
//     width: 5rem;
//   }

//   .details {
//     width: 100%;
//     padding: 0.5rem;
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     margin-left: 2rem;
//     align-self: center;
//     justify-self: center;
//   }
// `;

const fetchIngredients = async () => {
  const res = await getIngredients();
  const data = JSON.stringify(res);
  return data;
};

export default async function Ingredients() {
  const res = await getIngredients();
  const result = JSON.parse(res as string);
  const ingredients = result || [];

  return (
    <IngredientsList ingredients={ingredients} />
    // <div>
    //   {ingredients?.map((ingredient) => (
    //     <IngredientListItem ingredient={ingredient} />
    //     // <div key={ingredient?._id}>
    //     //   {ingredient?.photo?.image?._meta?.url ? (
    //     //     <img
    //     //       src={ingredient?.photo?.image?._meta?.url}
    //     //       alt={ingredient?.photo?.altText || ingredient?.name}
    //     //     />
    //     //   ) : (
    //     //     <div className="noPhoto">No Photo</div>
    //     //   )}

    //     //   <div className="details">{ingredient?.name}</div>
    //     // </div>
    //   ))}
    // </div>
  );
}
