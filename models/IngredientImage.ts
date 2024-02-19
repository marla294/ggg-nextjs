import { Schema, model, models } from 'mongoose';

const _meta = new Schema({
  url: {
    type: String
  }
});

const image = new Schema({
  children: [_meta],
  child: _meta
});

const ingredientImageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  altText: {
    type: String
  },
  image: {
    children: [image],
    child: image
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const IngredientImage = models.IngredientImage || model("IngredientImage", ingredientImageSchema);

export default IngredientImage;