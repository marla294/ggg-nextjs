import { Schema, model, models } from 'mongoose';

const recipeImageSchema = new Schema({
  altText: {
    type: String
  },
  imageUrl: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const RecipeImage = models.RecipeImage || model("RecipeImage", recipeImageSchema);

export default RecipeImage;