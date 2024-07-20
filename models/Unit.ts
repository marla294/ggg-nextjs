import { Schema, model, models } from 'mongoose';

const unitSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Unit = models.Unit || model("Unit", unitSchema);

export default Unit;