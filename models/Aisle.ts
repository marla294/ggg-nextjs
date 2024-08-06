import { Schema, model, models } from 'mongoose';

const aisleSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Aisle = models.Aisle || model("Aisle", aisleSchema);

export default Aisle;