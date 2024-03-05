import { Schema, model, models } from 'mongoose';

const shoppingListItemSchema = new Schema({
  quantity: {
    type: Number,
  },
});

const ShoppingListItem = models.ShoppingListItem || model("ShoppingListItem", shoppingListItemSchema);

export default ShoppingListItem;