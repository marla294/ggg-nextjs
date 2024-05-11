import { Schema, model, models } from 'mongoose';

const recipeItemSchema = new Schema({
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  quantity: {
    type: Number,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const RecipeItem = models.RecipeItem || model("RecipeItem", recipeItemSchema);

export default RecipeItem;