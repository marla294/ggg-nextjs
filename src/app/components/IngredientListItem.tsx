"use client";
// import styled from "styled-components";

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

const IngredientListItem = ({ ingredient }) => {
  console.log({ ingredient });

  return <div>{ingredient?.name}</div>;

  // return (
  //   <div key={ingredient?._id}>
  //     {ingredient?.photo?.image?._meta?.url ? (
  //       <img
  //         src={ingredient?.photo?.image?._meta?.url}
  //         alt={ingredient?.photo?.altText || ingredient?.name}
  //       />
  //     ) : (
  //       <div className="noPhoto">No Photo</div>
  //     )}

  //     <div className="details">{ingredient?.name}</div>
  //   </div>
  // );
};

export default IngredientListItem;
