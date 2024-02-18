import { Schema, model, models } from 'mongoose';

const meta = new Schema({

});

const image = new Schema({

});

const ingredientImageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  altText: {
    type: String
  },
  image: {

  }
});

const IngredientImage = models.IngredientImage || model("IngredientImage", ingredientImageSchema);

export default IngredientImage;