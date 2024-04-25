import { Schema, model, models } from 'mongoose';

const recipeItemSchema = new Schema({
  quantity: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});

const RecipeItem = models.RecipeItem || model("RecipeItem", recipeItemSchema);

export default RecipeItem;