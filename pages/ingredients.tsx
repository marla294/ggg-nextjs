import clientPromise from "../lib/mongodb";

interface Ingredient {
  _id: string;
  name: string;
  description: string;
  store: string;
  units: string;
  aisle: string;
  homeArea: string;
  user: string;
  photo: Object;
}

export default function Ingredients({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div>
      {ingredients?.map((ingredient: Ingredient) => (
        <div key={ingredient?._id}>
          <div>{ingredient?.name}</div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("ggg");

    const ingredients = await db
      .collection("ingredients")
      .find({})
      .limit(1000)
      .toArray();

    return {
      props: {
        ingredients: JSON.parse(JSON.stringify(ingredients)) as Ingredient[],
      },
    };
  } catch (e) {
    console.error(e);
  }
}
