import { Schema, model, models } from 'mongoose';

const ingredientImageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  __v: {
    type: Number
  },
  altText: {
    type: String
  }
});

const IngredientImage = models.IngredientImage || model("IngredientImage", ingredientImageSchema);

export default IngredientImage;