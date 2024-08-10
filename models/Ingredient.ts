import { Schema, model, models } from 'mongoose';

const ingredientSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
  },
  units: {
    type: String,
  },
  aisle: {
    type: Schema.Types.ObjectId,
    ref: 'Aisle'
  },
  homeArea: {
    type: Schema.Types.ObjectId,
    ref: 'HomeArea'
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