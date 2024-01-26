import User from "../../models/User";

export default async (_req: any, res: any) => {
  try {
    const user = await User.find({email: 'foremanfam@example.com'})
    .exec();

    res.json(user);
  } catch (e) {
    console.error(e);
  }
}