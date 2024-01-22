import { Schema, model, models } from 'mongoose';

const ingredientSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
  },
  store: {
    type: String,
  },
  units: {
    type: String,
  },
  aisle: {
    type: String,
  },
  homeArea: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// const Ingredient = models.Ingredient || model("Ingredient", ingredientSchema);
const Ingredient = model("Ingredient", ingredientSchema);

export default Ingredient;