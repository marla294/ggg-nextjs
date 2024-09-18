import { Schema, model, models } from 'mongoose';

const shoppingListItemSchema = new Schema({
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

const ShoppingListItem = models.ShoppingListItem || model("ShoppingListItem", shoppingListItemSchema);

export default ShoppingListItem;