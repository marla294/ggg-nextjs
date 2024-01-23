import { Schema, model, models } from 'mongoose';

const ingredientImageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  AltText: {
    type: String
  }
});

const IngredientImage = models.IngredientImage || model("IngredientImage", ingredientImageSchema);

export default IngredientImage;