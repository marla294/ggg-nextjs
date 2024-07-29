import { Schema, model, models } from 'mongoose';

const homeAreaSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const HomeArea = models.HomeArea || model("HomeArea", homeAreaSchema);

export default HomeArea;