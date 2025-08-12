import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    taskId: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    deletedAt: { type: Date, default: null },
    edited: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
