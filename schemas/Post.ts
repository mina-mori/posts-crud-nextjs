import mongoose, { Document, Model, Schema } from 'mongoose';

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  id: { type: Number, unique: true },
});

// Pre-save hook to set the auto-incremented id
postSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const model = this.constructor as Model<IPost>; // Cast to the correct type
    const lastPost = await model.findOne({}, {}, { sort: { id: -1 } });
    if (lastPost && lastPost.id) {
      this.id = lastPost.id + 1;
    } else {
      this.id = 1;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
