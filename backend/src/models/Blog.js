import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: String }],
  published: { type: Boolean, default: false }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
