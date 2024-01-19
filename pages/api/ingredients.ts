import clientPromise from "../../lib/mongodb";

export default async (_req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = client.db('ggg');

    const ingredients = await db
    .collection('ingredients')
    .find({})
    .limit(10)
    .toArray();

    res.json(ingredients);
  } catch (e) {
    console.error(e);
  }
}