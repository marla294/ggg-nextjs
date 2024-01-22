import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required.']
  }, 
  email: {
    type: String,
    required: [true, "User email is required."]
  }
});

const User = models.User || model("User", userSchema);

export default User;