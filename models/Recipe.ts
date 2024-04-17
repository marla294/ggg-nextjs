import { Schema, model, models } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'RecipeImage'
  }
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;