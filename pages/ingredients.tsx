import dbConnect from "../lib/dbconnect";
import Ingredient from "../models/Ingredient";
import IngredientImage from "../models/IngredientImage";
import User from "../models/User";

export default function Ingredients({ ingredients }) {
  console.log({ ingredients });
  return (
    <div>
      {ingredients?.map((ingredient) => (
        <div key={ingredient?._id}>
          <div>{ingredient?.name}</div>
          <div>{ingredient?.user?.name}</div>
          <img src={ingredient?.photo?.image?._meta?.url} />
        </div>
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
