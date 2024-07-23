import { Schema, model, models } from 'mongoose';

const recipeTypeSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const RecipeType = models.RecipeType || model("RecipeType", recipeTypeSchema);

export default RecipeType;