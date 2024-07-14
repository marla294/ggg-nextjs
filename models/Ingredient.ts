import { Schema, model, models } from 'mongoose';

const ingredientSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
  },
  // store: {
  //   type: String,
  // },
  units: {
    type: String,
  },
  aisle: {
    type: String,
  },
  homeArea: {
    type: String,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'IngredientImage'
  }
});

const Ingredient = models.Ingredient || model("Ingredient", ingredientSchema);

export default Ingredient;