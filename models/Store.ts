import { Schema, model, models } from 'mongoose';

const storeSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Store = models.Store || model("Store", storeSchema);

export default Store;