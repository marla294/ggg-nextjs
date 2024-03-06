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
  }
});

const ShoppingListItem = models.ShoppingListItem || model("ShoppingListItem", shoppingListItemSchema);

export default ShoppingListItem;