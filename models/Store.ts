import { Schema, model, models } from 'mongoose';

const storeSchema = new Schema({
  name: {
    type: String
  },
});

const Store = models.Store || model("Store", storeSchema);

export default Store;