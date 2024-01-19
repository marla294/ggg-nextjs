import clientPromise from "../lib/mongodb";

export default function Ingredients({ ingredients }: { ingredients: any }) {
  return (
    <div>
      {ingredients?.map((ingredient: any) => (
        <div key={ingredient?.id}>
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
      .limit(10)
      .toArray();

    return {
      props: {
        ingredients: JSON.parse(JSON.stringify(ingredients)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}
