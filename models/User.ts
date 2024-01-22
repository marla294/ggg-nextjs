import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  __v: {
    type: Number
  },
  email: {
    type: String,
  },
  joinDate: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;