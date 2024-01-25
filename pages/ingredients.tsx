import dbConnect from "../lib/dbconnect";
import Ingredient from "../models/Ingredient";
import IngredientImage from "../models/IngredientImage";
import User from "../models/User";
import styled from "styled-components";

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

export default function Ingredients({ ingredients }) {
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

export async function getServerSideProps() {
  try {
    await dbConnect();

    const ingredients = await Ingredient.find({})
      .populate([
        {
          path: "user",
          model: User,
        },
      ])
      .populate([
        {
          path: "photo",
          model: IngredientImage,
        },
      ])
      .exec();

    return {
      props: {
        ingredients: JSON.parse(JSON.stringify(ingredients)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}
