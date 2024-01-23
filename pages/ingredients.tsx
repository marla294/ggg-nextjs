import dbConnect from "../lib/dbconnect";
import clientPromise from "../lib/mongodb";
import Ingredient from "../models/Ingredient";
import IngredientImage from "../models/IngredientImage";
import User from "../models/User";

// interface Ingredient {
//   _id: string;
//   name: string;
//   description: string;
//   store: string;
//   units: string;
//   aisle: string;
//   homeArea: string;
//   user: string;
//   photo: Object;
// }

export default function Ingredients({ ingredients }) {
  // console.log({ ingredients });
  return (
    <div>
      {ingredients?.map((ingredient) => (
        <div key={ingredient?._id}>
          <div>{ingredient?.name}</div>
          <div>{ingredient?.user?.name}</div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();
    // const db = client.db("ggg");

    const ingredients = await Ingredient.find({})
      .populate([
        {
          path: "user",
          model: User,
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
