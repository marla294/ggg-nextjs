"use client";
import styled from "styled-components";
import getIngredients from "./action";
import { useEffect, useState } from "react";

const ListItemStyles = styled.div`
  background: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10rem 5fr;

  img {
    object-fit: cover;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
  }

  .noPhoto {
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

const fetchIngredients = async () => {
  const res = await getIngredients();
  console.log({ res });
  // const ingredients = await res.json();
  return res;
};

export default async function Ingredients() {
  const ingredients = await fetchIngredients();

  // useEffect(() => {
  //   console.log("call useEffect");
  //   if (!ingredients) {
  //     const fetchIngredients = async () => {
  //       const result = await getIngredients();
  //       setIngredients(result as any[]);
  //     };

  //     fetchIngredients();
  //   }
  // }, []);

  return (
    <div>
      {ingredients?.map((ingredient) => (
        <ListItemStyles key={ingredient?._id}>
          {ingredient?.photo?.image?._meta?.url ? (
            <img
              src={ingredient?.photo?.image?._meta?.url}
              alt={ingredient?.photo?.altText || ingredient?.name}
            />
          ) : (
            <div className="noPhoto">No Photo</div>
          )}

          <div className="details">{ingredient?.name}</div>
        </ListItemStyles>
      ))}
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     await dbConnect();

//     const ingredients = await Ingredient.find({})
//       .populate([
//         {
//           path: "user",
//           model: User,
//         },
//       ])
//       .populate([
//         {
//           path: "photo",
//           model: IngredientImage,
//         },
//       ])
//       .exec();

//     return {
//       props: {
//         ingredients: JSON.parse(JSON.stringify(ingredients)),
//       },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
