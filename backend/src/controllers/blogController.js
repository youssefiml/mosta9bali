import Blog from '../models/Blog.js';

export const listBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name email');
  res.json(blogs);
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
};

export const createBlog = async (req, res) => {
  const newBlog = await Blog.create(req.body);
  res.status(201).json(newBlog);
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json({ ok: true });
};
