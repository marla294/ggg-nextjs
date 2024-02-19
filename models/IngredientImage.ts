import { Schema, model, models } from 'mongoose';

const ingredientImageSchema = new Schema({
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

const IngredientImage = models.IngredientImage || model("IngredientImage", ingredientImageSchema);

export default IngredientImage;